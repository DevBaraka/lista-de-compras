window.addEventListener('load', carregarDoLocalStorage);

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
    newItem.classList.add('no-list-marker');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-checkbox';

    let itemNameSpan = document.createElement('span');
    itemNameSpan.textContent = newItemText;
    itemNameSpan.classList.add('no-text-decoration');

    let priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.className = 'item-price';
    priceInput.placeholder = 'Preço';

    let quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'item-quantity';
    quantityInput.placeholder = 'Und';
    quantityInput.size = 2;

    let trash = document.createElement('img');
    trash.className = 'item-trash';
    trash.src = "trash.png";
    
    trash.addEventListener('click', function() {
      let listItem = this.closest('li'); // Encontra o elemento <li> pai do "trash"
      if (listItem) {
          listItem.remove(); // Remove o elemento <li> da lista
          calculateTotal(); // Recalcula o total após a remoção
      }
    });

    const newItemData = {
      name: newItemText,
      price: "",
      quantity: "",
      checked: false,
      };
      listaDeCompras.push(newItemData);

      salvarNoLocalStorage();

      itemName.value = '';
    

    newItem.appendChild(checkbox);
    newItem.appendChild(itemNameSpan);
    newItem.appendChild(priceInput);
    newItem.appendChild(quantityInput);
    newItem.appendChild(trash);

    itemList.appendChild(newItem);

    priceInput.addEventListener('input', function() {
      calculateTotal();
    });

    quantityInput.addEventListener('input', function() {
      calculateTotal();
    });

    checkbox.addEventListener('change', function() {
      calculateTotal();
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
          let itemQuantityValue = parseInt(quantityInputs[i].value);
          let checkbox = checkboxes[i]; // Pega o checkbox correspondente

          if (!isNaN(itemPriceValue) && !isNaN(itemQuantityValue)) {
              if (checkbox && checkbox.checked) { // Verifica se o checkbox existe e está marcado
                  totalValue += itemPriceValue * itemQuantityValue;
              }
          }
          
      }

      totalValue = Math.max(totalValue, 0);
      totalValueInput.value = totalValue.toFixed(2);

      gastoTotal();

      salvarNoLocalStorage();
    }
    function gastoTotal() {
      let valePrice = parseFloat(totalGastarInput.value);
      let result = valePrice - totalValue;
      
      result = Math.max(result, 0);
      
      console.log(result);

      totalGastarInput.value = result;
              
      salvarNoLocalStorage();
    }
    
    function salvarNoLocalStorage() {
      const dataToSave = {
          totalValue: totalValue,
          totalGastarInput: totalGastarInput.value,
          listaDeCompras: listaDeCompras,
      };
  
      localStorage.setItem('dadosDeCompras', JSON.stringify(dataToSave));
     }

    function carregarDoLocalStorage() {
      const dadosSalvos = localStorage.getItem('dadosDeCompras');
  
      if (dadosSalvos) {
        const dadosParseados = JSON.parse(dadosSalvos);

        totalValue = dadosParseados.totalValue || 0;
        totalValueInput.value = totalValue.toFixed(2);
        totalGastarInput.value = dadosParseados.totalGastarInput || 0;

        const itemList = document.querySelector('.item-List');

        for (const itemData of dadosParseados.listaDeCompras) {
            const newItem = document.createElement('li');
            newItem.classList.add('no-list-marker');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'item-checkbox';
            checkbox.checked = itemData.checked;

            const itemNameSpan = document.createElement('span');
            itemNameSpan.textContent = itemData.name;
            itemNameSpan.classList.add('no-text-decoration');

            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.className = 'item-price';
            priceInput.placeholder = 'Preço';
            priceInput.value = itemData.price;

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.className = 'item-quantity';
            quantityInput.placeholder = 'Und';
            quantityInput.size = 2;
            quantityInput.value = itemData.quantity;

            const trash = document.createElement('img');
            trash.className = 'item-trash';
            trash.src = 'trash.png';

            trash.addEventListener('click', function() {
                let listItem = this.closest('li');
                if (listItem) {
                    listItem.remove();
                    calculateTotal();
                }
            });

            newItem.appendChild(checkbox);
            newItem.appendChild(itemNameSpan);
            newItem.appendChild(priceInput);
            newItem.appendChild(quantityInput);
            newItem.appendChild(trash);

            itemList.appendChild(newItem);

            priceInput.addEventListener('input', function() {
                calculateTotal();
            });

            quantityInput.addEventListener('input', function() {
                calculateTotal();
            });

            checkbox.addEventListener('change', function() {
                calculateTotal();
            });
        }
    }
  }

  