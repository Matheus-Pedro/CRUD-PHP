
function adicionarAoCarrinho(produto) {
    fetch('./api/products.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'adicionar',
        produto: produto
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Produto adicionado ao carrinho:', data.produto);
        atualizarCarrinho();
      } else {
        console.error('Erro ao adicionar produto:', data.error);
      }
    })
    .catch(error => console.error('Erro:', error));
  }
   


function removerDoCarrinho(index) {
    fetch('./api/products.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'remover',
        index: index
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Produto removido do carrinho:', data.produto);
        atualizarCarrinho();
      } else {
        console.error('Erro ao remover produto:', data.error);
      }
    })
    .catch(error => console.error('Erro:', error));
  }
  

function atualizarCarrinho() {
    fetch('./api/products.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'listar'
      })
    })
    .then(response => response.json())
    .then(data => {
      const cartItems = document.getElementById('cart-items');
      const subtotalElement = document.getElementById('subtotal');
      const totalElement = document.getElementById('total');
      
      cartItems.innerHTML = '';
      let subtotal = 0;
  
      data.carrinho.forEach((produto, index) => {
        const totalProduto = parseFloat(produto.preco) * produto.quantidade;
        subtotal += totalProduto;
  
        cartItems.innerHTML += `
          <tr>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${totalProduto.toFixed(2)}</td>
            <td>
              <button class="btn btn-danger remove-from-cart" data-index="${index}">Remover</button>
            </td>
          </tr>
        `;
      });
  
      subtotalElement.innerText = `R$ ${subtotal.toFixed(2)}`;
      totalElement.innerText = `R$ ${subtotal.toFixed(2)}`;
  
      document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          removerDoCarrinho(index);
        });
      });
    })
    .catch(error => console.error('Erro ao listar produtos do carrinho:', error));
  }
  