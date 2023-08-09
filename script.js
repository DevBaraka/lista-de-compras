let totalValueInput = document.querySelector(".totalValue");
let totalValue = 0;
let totalGastarInput = document.querySelector('.totalGastar');

let listaDeCompras = [];

function clicou() {
    let itemName = document.querySelector('.item-name');
    let itemList = document.querySelector('.item-List')

    let newItemText = itemName.value;

    if (newItemText !== '') {
        let newItem = document.createElement('li');

        let priceInput = document.createElement('input');
        priceInput.type = 'number';
        priceInput.className = 'item-price';
        priceInput.placeholder = 'Preço';

        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'item-quantity';
        quantityInput.placeholder = 'Und';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'item-checkbox';

        newItem.textContent = newItemText + ' - Preço: R$:';
        itemList.appendChild(newItem);

        newItem.appendChild(checkbox);
        itemList.appendChild(newItem);
        newItem.appendChild(priceInput);
        newItem.appendChild(quantityInput);

        priceInput.addEventListener('input', function() {
            calculateTotal();
            salvarListaNoLocalStorage();
          });
      
          quantityInput.addEventListener('input', function() {
            calculateTotal();
            salvarListaNoLocalStorage();
          });
      
          checkbox.addEventListener('change', function() {
            calculateTotal();
            salvarListaNoLocalStorage();
          });

          listaDeCompras.push({
            nome: newItemText,
            preco: 0, // Valor inicial
            quantidade: 0, // Valor inicial
            marcado: false // Valor inicial
          });
        
        itemName.value = '';
    } 
}

    function calculateTotal() {
        totalValue = 0;
        let priceInputs = document.querySelectorAll('.item-price');
        let quantityInputs = document.querySelectorAll('.item-quantity');
        let checkboxes = document.querySelectorAll('.item-checkbox');

        for (let i = 0; i < priceInputs.length; i++) {
        let itemPriceValue = parseFloat(priceInputs[i].value);
        let itemQuantityValue = parseFloat(quantityInputs[i].value);
        
        if (!isNaN(itemPriceValue) && !isNaN(itemQuantityValue)) {
            if (checkboxes[i].checked) {
            totalValue += itemPriceValue * itemQuantityValue;
            }

            listaDeCompras[i].preco = itemPriceValue;
            listaDeCompras[i].quantidade = itemQuantityValue;
            listaDeCompras[i].marcado = checkboxes[i].checked;
        }
          console.log(i);
        
      }
        totalValueInput.value = totalValue.toFixed(2);
        gastoTotal();
        salvarListaNoLocalStorage();
    
    }
    function gastoTotal() {
      let valePrice = parseFloat(totalGastarInput.value);
      let result = valePrice - totalValue;
      
      // Define um valor mínimo de 0 para o resultado
      result = Math.max(result, 0);
      
      console.log(result);

      totalGastarInput.value = result;
      salvarListaNoLocalStorage();
              
    }

    function salvarListaNoLocalStorage() {
    localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
  }

  function carregarListaDoLocalStorage() {
    let savedListaDeCompras = localStorage.getItem('listaDeCompras');

    if (savedListaDeCompras !== null) {
        listaDeCompras = JSON.parse(savedListaDeCompras);

        let priceInputs = document.querySelectorAll('.item-price');
        let quantityInputs = document.querySelectorAll('.item-quantity');
        let checkboxes = document.querySelectorAll('.item-checkbox');

        for (let i = 0; i < listaDeCompras.length; i++) {
            if (priceInputs[i] && quantityInputs[i] && checkboxes[i]) {
                priceInputs[i].value = listaDeCompras[i].preco;
                quantityInputs[i].value = listaDeCompras[i].quantidade;
                checkboxes[i].checked = listaDeCompras[i].marcado;
            }
        }
    }
}

    carregarListaDoLocalStorage();  