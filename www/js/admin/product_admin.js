document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function openForm(formId) {
    document.getElementById(formId).style.display = 'block';
}

function cancelAdd(formId) {
    document.getElementById(formId).style.display = 'none';

    const form = document.getElementById(formId).querySelector('form');
    form.reset();  // Clear form fields

    // Reset submit behavior for adding a new user
    form.onsubmit = (event) => addProduct(event);
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
                            <button onclick="editProduct(${product.id}, '${product.title}', '${product.description}', ${product.price}, '${product.url_image}', ${product.discount})" class="btn btn-warning">Editar</button>
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
function editProduct(productId, title, description, price, url_image, discount) {
    document.getElementById('edit_product_title').value = title;
    document.getElementById('edit_product_description').value = description;
    document.getElementById('edit_product_price').value = price;
    document.getElementById('edit_product_url_image').value = url_image;
    document.getElementById('edit_product_discount').value = discount;

    const productForm = document.getElementById('editProductForm');
    productForm.onsubmit = (event) => updateProduct(event, productId);
    console.log("passou no edit")
    openForm('editProductForm');
}

function updateProduct(event, productId) {
    event.preventDefault();
    const product = {
        id: productId,
        title: document.getElementById('edit_product_title').value,
        description: document.getElementById('edit_product_description').value,
        price: document.getElementById('edit_product_price').value,
        url_image: document.getElementById('edit_product_url_image').value,
        discount: document.getElementById('edit_product_discount').value
    };

    fetch('./api/products.php', {
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
        cancelAdd('editProductForm');
    })
    .catch(error => console.error('Erro ao editar produto:', error));
}


function deleteProduct(productId) {
    const requestBody = {
        id: productId
    };

    fetch('./api/products.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao excluir produto');
            return response.json();
        })
        .then(() => fetchProducts())  // Update user list after deletion
        .catch(error => console.error('Erro ao excluir produto:', error));
}
