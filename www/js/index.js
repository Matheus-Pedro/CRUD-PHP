const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener('click', () => {
    navbar.classList.toggle('show-menu');
});




const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const product = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        };


        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex !== -1) {

            cart[existingProductIndex].quantity += 1;
        } else {

            cart.push(product);
        }


        localStorage.setItem('cart', JSON.stringify(cart));


        window.location.href = 'carrinho.html';
    });
});







  




