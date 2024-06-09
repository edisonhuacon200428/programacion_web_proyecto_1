const productList = document.querySelector('.product-list');
const cartItems = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.checkout-btn');

const products = [
    { id: 1, name: 'Silla de Oficina', price: 149.99, image: 'foto22.jpeg' },
    { id: 2, name: 'Sofá de 3 Plazas', price: 599.99, image: 'foto23.jpg' },
    { id: 3, name: 'Mesa de Comedor', price: 399.99, image: 'foto24.jpeg' },
    { id: 4, name: 'Armario Empotrado', price: 899.99, image: 'foto25.jpg' },
    { id: 5, name: 'Cama Queen Size', price: 799.99, image: 'foto26.jpeg' },
    { id: 6, name: 'Estantería Modular', price: 249.99, image: 'foto27.jpg' }
];

products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
    `;
    productList.appendChild(productElement);
});

let cart = [];

productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = event.target.dataset.id;
        const product = products.find(p => p.id === parseInt(productId));
        cart.push(product);
        renderCartItems();
        updateTotalPrice();
    }
});

function renderCartItems() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
        `;
        cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
            removeFromCart(item.id);
        });
        cartItems.appendChild(cartItem);
    });
}

function updateTotalPrice() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== parseInt(productId));
    renderCartItems();
    updateTotalPrice();
}

checkoutBtn.addEventListener('click', () => {
    alert(`¡Gracias por tu compra! Tu total es de $${totalPrice.textContent.split(': ')[1]}`);
    cart = [];
    renderCartItems();
    updateTotalPrice();
});