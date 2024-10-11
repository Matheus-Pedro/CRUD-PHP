   document.getElementById('user-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch('./api/users.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar as informações');
            }

            const result = await response.json();
            alert('Informações atualizadas com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro: ' + error.message);
        }
    });

    function removePhoto() {
        alert('Foto removida com sucesso!');
    }