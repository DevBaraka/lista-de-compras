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
        priceInput.placeholder = 'Preço do item';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'item-checkbox';

        newItem.textContent = newItemText + ' - Preço: R$:';
        itemList.appendChild(newItem);

        newItem.appendChild(checkbox);
        itemList.appendChild(newItem);
        newItem.appendChild(priceInput);

        priceInput.addEventListener('input', function() {
        calculateTotal();
        });

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
            calculateTotal();
            }
        });

        itemName.value = '';
    } 
}

    function calculateTotal() {
        totalValue = 0;
        let priceInputs = document.querySelectorAll('.item-price');
        let checkboxes = document.querySelectorAll('.item-checkbox');
    
        for (let i = 0; i < priceInputs.length; i++) {
        let itemPriceValue = parseFloat(priceInputs[i].value);
        if (!isNaN(itemPriceValue)) {
            if (checkboxes[i].checked) {
            totalValue += itemPriceValue;
            }
        }
        }
    
        totalValueInput.value = totalValue.toFixed(2);
    }