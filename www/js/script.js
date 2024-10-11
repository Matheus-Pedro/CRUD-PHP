document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchSellers();
    fetchUsers();
});

function openForm(formId) {
    document.getElementById(formId).style.display = 'block';
}

function cancelAdd(formId) {
    document.getElementById(formId).style.display = 'none';
    document.getElementById(formId).reset();
}

// Fetch de Produtos
function fetchProducts() {
    fetch('./api/products.php')
        .then(response => response.json())
        .then(data => {
            const productTableBody = document.getElementById('productTableBody');
            productTableBody.innerHTML = '';
            data.forEach(product => {
                productTableBody.innerHTML += `
                    <tr>
                        <td>${product.title}</td>
                        <td>${product.description}</td>
                        <td><img src="${product.url_image}" alt="${product.title}" width="50" height="50"></td>
                        <td>${product.price}</td>
                        <td>${(product.discount * 100).toFixed(2)}%</td>
                        <td>${product.sales_count}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button onclick="editProduct(${product.id}, '${product.title}', '${product.description}', ${product.price}, '${product.url_image}')" class="btn btn-warning">Editar</button>
                            <button onclick="confirmDeleteProduct(${product.id})" class="btn btn-danger">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
}

// Confirmar exclusão de produto
function confirmDeleteProduct(productId) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        deleteProduct(productId);
    }
}

// Adicionar Produto
function addProduct(event) {
    event.preventDefault();
    const product = {
        title: document.getElementById('product_title').value,
        description: document.getElementById('product_description').value,
        price: document.getElementById('product_price').value,
        url_image: document.getElementById('product_url_image').value
    };

    fetch('./api/products.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao adicionar produto');
        return response.json();
    })
    .then(() => {
        fetchProducts();
        cancelAdd('productForm');
    })
    .catch(error => console.error('Erro ao adicionar produto:', error));
}

// Editar Produto
function editProduct(productId, title, description, price, url_image) {
    document.getElementById('product_title').value = title;
    document.getElementById('product_description').value = description;
    document.getElementById('product_price').value = price;
    document.getElementById('product_url_image').value = url_image;

    const productForm = document.getElementById('productForm');
    productForm.onsubmit = (event) => updateProduct(event, productId);
    openForm('productForm');
}

function updateProduct(event, productId) {
    event.preventDefault();
    const product = {
        title: document.getElementById('product_title').value,
        description: document.getElementById('product_description').value,
        price: document.getElementById('product_price').value,
        url_image: document.getElementById('product_url_image').value
    };

    fetch(`./api/products.php?id=${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao editar produto');
        return response.json();
    })
    .then(() => {
        fetchProducts();
        cancelAdd('productForm');
    })
    .catch(error => console.error('Erro ao editar produto:', error));
}

function deleteProduct(productId) {
    fetch(`./api/products.php?id=${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao excluir produto');
        fetchProducts(); 
    })
    .catch(error => console.error('Erro ao excluir produto:', error));
}

// Fetch de Vendedores
function fetchSellers() {
    fetch('./api/sellers.php')
        .then(response => response.json())
        .then(data => {
            const vendedorTableBody = document.getElementById('vendedorTableBody');
            vendedorTableBody.innerHTML = '';
            data.forEach(vendedor => {
                vendedorTableBody.innerHTML += `
                    <tr>
                        <td>${vendedor.name}</td>
                        <td>${vendedor.email}</td>
                        <td>${vendedor.fone_number}</td>
                        <td>${vendedor.cpf_cnpj}</td>
                        <td>
                            <button onclick="editSeller(${vendedor.id}, '${vendedor.name}', '${vendedor.email}')" class="btn btn-warning">Editar</button>
                            <button onclick="confirmDeleteSeller(${vendedor.id})" class="btn btn-danger">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Erro ao buscar vendedores:', error));
}

// Confirmar exclusão de vendedor
function confirmDeleteSeller(sellerId) {
    if (confirm('Tem certeza que deseja excluir este vendedor?')) {
        deleteSeller(sellerId);
    }
}

// Adicionar Vendedor
function addSeller(event) {
    event.preventDefault();
    const seller = {
        name: document.getElementById('seller_name').value,
        email: document.getElementById('seller_email').value,
        fone_number: '',
        cpf_cnpj: ''
    };

    fetch('./api/sellers.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(seller)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao adicionar vendedor');
        return response.json();
    })
    .then(() => {
        fetchSellers();
        cancelAdd('vendedorForm');
    })
    .catch(error => console.error('Erro ao adicionar vendedor:', error));
}

// Editar Vendedor
function editSeller(sellerId, name, email) {
    document.getElementById('seller_name').value = name;
    document.getElementById('seller_email').value = email;

    const vendedorForm = document.getElementById('vendedorForm');
    vendedorForm.onsubmit = (event) => updateSeller(event, sellerId);
    openForm('vendedorForm');
}

function updateSeller(event, sellerId) {
    event.preventDefault();
    const seller = {
        name: document.getElementById('seller_name').value,
        email: document.getElementById('seller_email').value,
        fone_number: '',
        cpf_cnpj: ''
    };

    fetch(`./api/sellers.php?id=${sellerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(seller)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao editar vendedor');
        return response.json();
    })
    .then(() => {
        fetchSellers();
        cancelAdd('vendedorForm');
    })
    .catch(error => console.error('Erro ao editar vendedor:', error));
}

function deleteSeller(sellerId) {
    fetch(`./api/sellers.php?id=${sellerId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao excluir vendedor');
        fetchSellers();
    })
    .catch(error => console.error('Erro ao excluir vendedor:', error));
}

// Fetch de Usuários
function fetchUsers() {
    fetch('./api/users.php')
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById('userTableBody');
            userTableBody.innerHTML = '';
            data.forEach(user => {
                userTableBody.innerHTML += `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.fone_number}</td>
                        <td>${user.cpf_cnpj}</td>
                        <td>
                            <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')" class="btn btn-warning">Editar</button>
                            <button onclick="confirmDeleteUser(${user.id})" class="btn btn-danger">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
}

// Confirmar exclusão de usuário
function confirmDeleteUser(userId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        deleteUser(userId);
    }
}

// Adicionar Usuário
function addUser(event) {
    event.preventDefault();
    const user = {
        name: document.getElementById('user_name').value,
        email: document.getElementById('user_email').value,
        fone_number: '',
        cpf_cnpj: ''
    };

    fetch('./api/users.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao adicionar usuário');
        return response.json();
    })
    .then(() => {
        fetchUsers();
        cancelAdd('userForm');
    })
    .catch(error => console.error('Erro ao adicionar usuário:', error));
}

// Editar Usuário
function editUser(userId, name, email) {
    document.getElementById('user_name').value = name;
    document.getElementById('user_email').value = email;

    const userForm = document.getElementById('userForm');
    userForm.onsubmit = (event) => updateUser(event, userId);
    openForm('userForm');
}

function updateUser(event, userId) {
    event.preventDefault();
    const user = {
        name: document.getElementById('user_name').value,
        email: document.getElementById('user_email').value,
        fone_number: '',
        cpf_cnpj: ''
    };

    fetch(`./api/users.php?id=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao editar usuário');
        return response.json();
    })
    .then(() => {
        fetchUsers();
        cancelAdd('userForm');
    })
    .catch(error => console.error('Erro ao editar usuário:', error));
}

function deleteUser(userId) {
    fetch(`./api/users.php?id=${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao excluir usuário');
        fetchUsers();
    })
    .catch(error => console.error('Erro ao excluir usuário:', error));
}
