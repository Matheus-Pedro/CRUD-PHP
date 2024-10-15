document.addEventListener('DOMContentLoaded', () => {
    fetchSellers();
});

function openForm(formId) {
    document.getElementById(formId).style.display = 'block';
}

function cancelAdd(formId) {
    document.getElementById(formId).style.display = 'none';

    const form = document.getElementById(formId).querySelector('form');
    form.reset();  // Clear form fields

    // Reset submit behavior for adding a new user
    form.onsubmit = (event) => addSeller(event);
}

// Fetch de Vendedores
function fetchSellers() {
    fetch('./api/sellers.php')
        .then(response => response.json())
        .then(data => {
            const sellerTableBody = document.getElementById('sellerTableBody');
            sellerTableBody.innerHTML = '';
            data.forEach(seller => {
                sellerTableBody.innerHTML += `
                    <tr>
                        <td>${seller.name}</td>
                        <td>${seller.email}</td>
                        <td>${seller.fone_number}</td>
                        <td>${seller.cpf_cnpj}</td>
                        <td>
                            <button onclick="editSeller(${seller.id}, '${seller.name}', '${seller.email}', '${seller.fone_number}', '${seller.cpf_cnpj}')" class="btn btn-warning">Editar</button>
                            <button onclick="confirmDeleteSeller(${seller.id})" class="btn btn-danger">Excluir</button>
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
        cancelAdd('sellerForm');
    })
    .catch(error => console.error('Erro ao adicionar vendedor:', error));
}

// Editar Vendedor
function editSeller(sellerId, sellerName, sellerEmail, sellerFoneNumber, sellerCPFCNPJ) {
    document.getElementById('edit_seller_name').value = sellerName;
    document.getElementById('edit_seller_email').value = sellerEmail;
    document.getElementById('edit_seller_fone_number').value = sellerFoneNumber;
    document.getElementById('edit_seller_cpf_cnpj').value = sellerCPFCNPJ;


    const sellerForm = document.getElementById('editSellerForm');
    sellerForm.onsubmit = (event) => updateSeller(event, sellerId);

    openForm('editSellerForm');
}

function updateSeller(event, sellerId) {
    event.preventDefault();

    const seller = {
        id: sellerId,
        name: document.getElementById('edit_seller_name').value,
        email: document.getElementById('edit_seller_email').value,
        fone_number: document.getElementById('edit_seller_fone_number').value,
        cpf_cnpj: document.getElementById('edit_seller_cpf_cnpj').value
    };

    fetch('./api/sellers.php', {
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
        cancelAdd('editSellerForm');
    })
    .catch(error => console.error('Erro ao editar vendedor:', error));
}


function deleteSeller(sellerId) {
    const requestBody = {
        id: sellerId
    };

    fetch('./api/sellers.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao excluir vendedor');
            return response.json();
        })
        .then(() => fetchSellers())  // Update user list after deletion
        .catch(error => console.error('Erro ao excluir vendedor:', error));
}
