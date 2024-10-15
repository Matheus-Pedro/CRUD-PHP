document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

function openForm(formId) {
    document.getElementById(formId).style.display = 'block';
}

function cancelAdd(formId) {
    document.getElementById(formId).style.display = 'none';

    const form = document.getElementById(formId).querySelector('form');
    form.reset();  // Clear form fields

    // Reset submit behavior for adding a new user
    form.onsubmit = (event) => addUser(event);
}

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
                            <button onclick="editUser(${user.id}, '${user.name}', '${user.email}', '${user.fone_number}', '${user.cpf_cnpj}')" class="btn btn-warning">Editar</button>
                            <button onclick="confirmDeleteUser(${user.id})" class="btn btn-danger">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
}

// Confirm user deletion
function confirmDeleteUser(userId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        deleteUser(userId);
    }
}

// Add User
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

// Edit User
function editUser(userId, userName, userEmail, userFoneNumber, userCPFCNPJ) {
    // Fill the form with user data
    document.getElementById('edit_user_name').value = userName;
    document.getElementById('edit_user_email').value = userEmail;
    document.getElementById('edit_user_fone_number').value = userFoneNumber;
    document.getElementById('edit_user_cpf_cnpj').value = userCPFCNPJ;

    // Change the submit behavior to updateUser
    const editUserForm = document.getElementById('editUserForm');
    editUserForm.onsubmit = (event) => updateUser(event, userId);

    // Open the edit form
    openForm('editUserForm');
}

function updateUser(event, userId) {
    event.preventDefault();  // Prevent default form submission

    const user = {
        id: userId,
        name: document.getElementById('edit_user_name').value,
        email: document.getElementById('edit_user_email').value,
        fone_number: document.getElementById('edit_user_fone_number').value,
        cpf_cnpj: document.getElementById('edit_user_cpf_cnpj').value
    };

    // Make request to update the user
    fetch('./api/users.php', {
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
            fetchUsers();  // Update user list
            cancelAdd('editUserForm');  // Close form and reset
        })
        .catch(error => console.error('Erro ao editar usuário:', error));
}

function deleteUser(userId) {
    const requestBody = {
        id: userId
    };

    fetch('./api/users.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao excluir usuário');
            return response.json();
        })
        .then(() => fetchUsers())  // Update user list after deletion
        .catch(error => console.error('Erro ao excluir usuário:', error));
}
