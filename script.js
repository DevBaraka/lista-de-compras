let totalValueInput = document.querySelector(".totalValue");
let totalValue = 0;


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
        let itemQuantityValue = parseFloat(quantityInputs[i].value);
        
        if (!isNaN(itemPriceValue) && !isNaN(itemQuantityValue)) {
            if (checkboxes[i].checked) {
            totalValue += itemPriceValue * itemQuantityValue;
            }
        }
        }
    
        totalValueInput.value = totalValue.toFixed(2);
    }