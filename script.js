function showAlertWithMultipleLines() {
  const message = "Obrigado por usar nosso APP.\n"
                + "Deus e fiel\n"
                + "©DevBaraka";
  window.alert(message);
}

showAlertWithMultipleLines();

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

    newItem.appendChild(checkbox);
    newItem.appendChild(itemNameSpan);
    newItem.appendChild(priceInput);
    newItem.appendChild(quantityInput);

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
    }
    function gastoTotal() {
      let valePrice = parseFloat(totalGastarInput.value);
      let result = valePrice - totalValue;
      
      // Define um valor mínimo de 0 para o resultado
      result = Math.max(result, 0);
      
      console.log(result);

      totalGastarInput.value = result;
              
    }

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const balls = [];
    const numBalls = 50;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Ball {
      constructor(x, y, radius, dx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
      }

      update() {
        this.x += this.dx;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fill();
        ctx.closePath();
      }
    }

    for (let i = 0; i < numBalls; i++) {
      const radius = Math.random() * 20 + 10;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 4; // Velocidade horizontal

      balls.push(new Ball(x, y, radius, dx));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const ball of balls) {
        ball.update();
        ball.draw();
      }

      requestAnimationFrame(animate);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();