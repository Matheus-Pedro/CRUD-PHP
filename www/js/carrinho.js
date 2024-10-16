window.onload = function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    let subtotal = 0;

    cart.forEach(product => {
        const totalProductPrice = product.price * product.quantity;
        subtotal += totalProductPrice;

        const row = `
            <tr>
                <td>${product.name}</td>
                <td>R$ ${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>R$ ${totalProductPrice.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm remove-from-cart" data-name="${product.name}">Remover</button>
                </td>
            </tr>
        `;
        cartItemsContainer.innerHTML += row;
    });

    subtotalElement.innerText = `R$ ${subtotal.toFixed(2)}`;
    totalElement.innerText = `R$ ${subtotal.toFixed(2)}`;

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            cart = cart.filter(product => product.name !== productName);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        });
    });
};
