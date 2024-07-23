let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;
    };
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        }
    },
});




let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { name: 'Plain Black T-Shirt', image: 'image/blackshirt.png', price: 295 },
    { name: 'Plain Blue T-Shirt', image: 'image/blueshirt.png', price: 295 },
    { name: 'Plain Red T-Shirt', image: 'image/redshirt.png', price: 295 },
    { name: 'Plain White T-Shirt', image: 'image/whiteshirt.png', price: 295 },
    { name: 'PUP White T-Shirt', image: 'image/shirt2.png', price: 295 },
    { name: '19th Founding Anniversary Black T-Shirt', image: 'image/foundingshirtBlack.png', price: 295 },
    { name: 'PUP Hoodie blue', image: 'image/shirt6.png', price: 295 },
    { name: 'ABME T-Shirt Black', image: 'image/abmeSHIRTBLACK.png', price: 295 },
    { name: 'ABME T-Shirt Gray', image: 'image/abmeSHIRTGRAY.png', price: 295 },
    { name: 'ABME T-Shirt Red', image: 'image/abmeSHIRTRED.png', price: 295 },
    // Add other products here
];

let listCards = [];

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity++;
        listCards[key].price = listCards[key].quantity * products[key].price;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}" /></div>
                <div>${value.name}</div>
                <div>₱${value.price.toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = `₱${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}

function changeQuantity(key, qty) {
    if (qty == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = qty;
        listCards[key].price = qty * products[key].price;
    }
    reloadCard();
}

// Function to check if the user is logged in
function isLoggedIn() {
    // For example purposes, use sessionStorage to check login status
    // In a real application, this could be a call to an API or a check for a token
    return !!sessionStorage.getItem('userLoggedIn'); 
}

// Function to redirect to the payment page or login page
function redirectToPayment() {
    if (isLoggedIn()) {
        // Redirect to payment page if logged in
        window.location.href = 'payment.html';
    } else {
        // Alert the user and redirect to login or registration page if not logged in
        alert('Please log in or register first.');
        window.location.href = 'signin.html'; // Change this to your login or registration page
    }
}



document.getElementById('checkoutLink').addEventListener('click', function(event) {
    const totalAmount = parseFloat(document.getElementById('totalAmount').textContent);
    
    if (totalAmount === 0) {
        event.preventDefault();  // Prevent the link from navigating
        alert('No items in the cart!');
    }
});