let botao = document.querySelector('.botao');
let itemName = document.querySelector('.item-name');
let itemPreco = document.querySelector('.item-preco');
let itemList = document.querySelector('.item-List')
let totalValueInput = document.querySelector(".totalValue");
let totalValue = 0;
let myInput = document.querySelector('.botao');


window.addEventListener('resize', function() {
    

    if(window.innerWidth <=380) {
        myInput.placeholder = 'Adicionar';
    }
});

function clicou() {
    let newItemText = itemName.value;
    let itemPrecoValue = parseFloat(itemPreco.value);

    if (newItemText !== '' && !isNaN(itemPrecoValue) && itemPrecoValue > 0) {
        let newItem = document.createElement('li');

        newItem.textContent = newItemText + ' - Preço: R$:' + itemPrecoValue;
        itemList.appendChild(newItem);

        totalValue += itemPrecoValue;
        totalValueInput.value = totalValue.toFixed(2);

        itemName.value = '';
        itemPreco.value = '';
    } else {
        window.alert('Você nao preencheu os campos corretamente!')
    }
}