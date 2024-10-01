let produtos = [];
let vendedores = [];
let usuarios = [];
let enderecos = [];
let avaliacoesProdutos = [];
let avaliacoesVendedores = [];
let statusVendedores = [];

function openForm(formId) {
    document.getElementById(formId).style.display = 'block';
}

function cancelAdd(formId) {
    document.getElementById(formId).style.display = 'none';
    document.getElementById(formId).reset();
}

function addProduct(event) {
    event.preventDefault();
    const product = {
        id: produtos.length + 1,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        discount: parseFloat(document.getElementById('discount').value),
        url_image: document.getElementById('url_image').value,
        sales_count: parseInt(document.getElementById('sales_count').value),
        avaliation: parseFloat(document.getElementById('avaliation').value),
        saller_id: parseInt(document.getElementById('saller_id').value)
    };
    produtos.push(product);
    displayProducts();
    cancelAdd('productForm');
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<h3>Lista de Produtos</h3>' + produtos.map(p => `
        <div class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">${p.title}</h5>
                <p class="card-text">${p.description}</p>
                <p>Preço: R$ ${p.price.toFixed(2)}</p>
                <p>Desconto: ${p.discount}%</p>
                <p>Quantidade Vendida: ${p.sales_count}</p>
                <p>Avaliação: ${p.avaliation}</p>
                <p>ID do Vendedor: ${p.saller_id}</p>
            </div>
        </div>
    `).join('');
}

function addVendedor(event) {
    event.preventDefault();
    const vendedor = {
        id: vendedores.length + 1,
        name: document.getElementById('vendedor_name').value,
        phone_number: document.getElementById('phone_number').value,
        cpf_cnpj: document.getElementById('cpf_cnpj').value,
        avaliation_id: parseInt(document.getElementById('avaliation_id').value),
        address: document.getElementById('vendedor_address').value
    };
    vendedores.push(vendedor);
    displayVendedores();
    cancelAdd('vendedorForm');
}

function displayVendedores() {
    const vendedorList = document.getElementById('vendedor-list');
    vendedorList.innerHTML = '<h3>Lista de Vendedores</h3>' + vendedores.map(v => `
        <div class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">${v.name}</h5>
                <p class="card-text">Telefone: ${v.phone_number}</p>
                <p>CPF/CNPJ: ${v.cpf_cnpj}</p>
                <p>ID da Avaliação: ${v.avaliation_id}</p>
                <p>Endereço: ${v.address}</p>
            </div>
        </div>
    `).join('');
}

function addUser(event) {
    event.preventDefault();
    const user = {
        id: usuarios.length + 1,
        name: document.getElementById('user_name').value,
        email: document.getElementById('user_email').value,
        phone_number: document.getElementById('user_phone').value,
        address: document.getElementById('user_address').value
    };
    usuarios.push(user);
    displayUsers();
    cancelAdd('userForm');
}

function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '<h3>Lista de Usuários</h3>' + usuarios.map(u => `
        <div class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">${u.name}</h5>
                <p class="card-text">Email: ${u.email}</p>
                <p>Telefone: ${u.phone_number}</p>
                <p>Endereço: ${u.address}</p>
            </div>
        </div>
    `).join('');
}

function addEndereco(event) {
    event.preventDefault();
    const endereco = {
        id: enderecos.length + 1,
        street: document.getElementById('street').value,
        number: parseInt(document.getElementById('number').value),
        complement: document.getElementById('complement').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
        postal_code: document.getElementById('postal_code').value
    };
    enderecos.push(endereco);
    displayEnderecos();
    cancelAdd('enderecoForm');
}

function displayEnderecos() {
    const enderecoList = document.getElementById('endereco-list');
    enderecoList.innerHTML = '<h3>Lista de Endereços</h3>' + enderecos.map(e => `
        <div class="card mb-2">
            <div class="card-body">
                <p><strong>Rua:</strong> ${e.street}, ${e.number}</p>
                <p><strong>Complemento:</strong> ${e.complement}</p>
                <p><strong>Cidade:</strong> ${e.city}</p>
                <p><strong>Estado:</strong> ${e.state}</p>
                <p><strong>País:</strong> ${e.country}</p>
                <p><strong>Código Postal:</strong> ${e.postal_code}</p>
            </div>
        </div>
    `).join('');
}

function addAvaliacaoProduto(event) {
    event.preventDefault();
    const avaliacaoProduto = {
        id: avaliacoesProdutos.length + 1,
        rating: parseInt(document.getElementById('rating_produto').value),
        comment: document.getElementById('comment_produto').value
    };
    avaliacoesProdutos.push(avaliacaoProduto);
    displayAvaliacoesProdutos();
    cancelAdd('avaliacaoProdutoForm');
}

function displayAvaliacoesProdutos() {
    const avaliacaoProdutoList = document.getElementById('avaliacaoProduto-list');
    avaliacaoProdutoList.innerHTML = '<h3>Lista de Avaliações de Produtos</h3>' + avaliacoesProdutos.map(a => `
        <div class="card mb-2">
            <div class="card-body">
                <p>Avaliação: ${a.rating}</p>
                <p>Comentário: ${a.comment}</p>
            </div>
        </div>
    `).join('');
}

function addAvaliacaoVendedor(event) {
    event.preventDefault();
    const avaliacaoVendedor = {
        id: avaliacoesVendedores.length + 1,
        rating: parseInt(document.getElementById('rating_vendedor').value),
        reviews_count: parseInt(document.getElementById('reviews_count').value),
        sales_count: parseInt(document.getElementById('sales_count_vendedor').value)
    };
    avaliacoesVendedores.push(avaliacaoVendedor);
    displayAvaliacoesVendedores();
    cancelAdd('avaliacaoVendedorForm');
}

function displayAvaliacoesVendedores() {
    const avaliacaoVendedorList = document.getElementById('avaliacaoVendedor-list');
    avaliacaoVendedorList.innerHTML = '<h3>Lista de Avaliações de Vendedores</h3>' + avaliacoesVendedores.map(a => `
        <div class="card mb-2">
            <div class="card-body">
                <p>Avaliação: ${a.rating}</p>
                <p>Contagem de Comentários: ${a.reviews_count}</p>
                <p>Contagem de Vendas: ${a.sales_count}</p>
            </div>
        </div>
    `).join('');
}

function addStatus(event) {
    event.preventDefault();
    const status = {
        id: statusVendedores.length + 1,
        status: document.getElementById('status').value
    };
    statusVendedores.push(status);
    displayStatus();
    cancelAdd('statusForm');
}

function displayStatus() {
    const statusList = document.getElementById('status-list');
    statusList.innerHTML = '<h3>Lista de Status de Vendedores</h3>' + statusVendedores.map(s => `
        <div class="card mb-2">
            <div class="card-body">
                <p>Status: ${s.status}</p>
            </div>
        </div>
    `).join('');
}