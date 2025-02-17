
let productData = [];

function fetchData() {
    fetch("https://bastide-backend.onrender.com/product")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            productData = data;
            renderProductList(data);
        })
        .catch((err) => console.error(err));
}

fetchData();

function renderProductList(data) {
    const mainSection = document.getElementById('data-list-wrapper') || document.querySelector('.col-10 .row');
    if (!data || data.length === 0) {
        mainSection.innerHTML = "<p>No products available</p>";
    } else {
        mainSection.innerHTML = data.map(el => createProductCard(el.id, el.image, el.title, el.price)).join("");
    }
}


function createProductCard({ id, image, title, price }) {
    return `
      <div class="product-card" onclick="navigateToDescription(${id})">
        <div class="product-image">
          <img src="${image}" alt="${title}" class="img-fluid rounded">
        </div>
        <h2>${title}</h2>
        <span class="product-price">$${price}</span>
      </div>
    `;
}


function navigateToDescription(productId) {
    // Redirect to description page with product ID as a URL parameter
    window.location.href = `description.html?productId=${productId}`;
}


// head-slider
const slidingText = document.getElementById("sliding-text");
const sentences = slidingText.innerHTML.split(" | ");
let sentenceIndex = 0;

function slideText() {
    const maxWidth = window.innerWidth - slidingText.clientWidth;
    let currentPosition = 0;
    // console.log(maxWidth);

    const slideInterval = setInterval(() => {
        if (currentPosition <= maxWidth) {
            slidingText.style.left = currentPosition + "px";
            currentPosition += 10;
        }
        else {
            clearInterval(slideInterval);
            setTimeout(() => {
                slidingText.style.left = "0px";
                sentenceIndex = (sentenceIndex + 1) % sentences.length;
                slidingText.innerHTML = sentences[sentenceIndex];
                setTimeout(slideText, 2000);
            }
                , 1000);
        }
    }, 10);
}
slideText();

// increment-decrement
let products = [
    { quantity: 1 },
];

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
    <button onclick="decrementQuantity(${index})" class="decrement-button">-</button>
    <span class="quantity">${product.quantity}</span>
    <button onclick="incrementQuantity(${index})" class="increment-button">+</button>

    `;
        productList.appendChild(productDiv);
    });
}

function incrementQuantity(index) {
    products[index].quantity++;
    renderProducts();
}

function decrementQuantity(index) {
    if (products[index].quantity > 0) {
        products[index].quantity--;
    }
    renderProducts();
}
renderProducts();


// small slider
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    const offset = -currentSlideIndex * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
    showSlide(index);
}

// Initial display
showSlide(currentSlideIndex);

// accordian
document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const expanded = button.getAttribute('aria-expanded') === 'true' || false;

            // Close all open accordions
            accordionButtons.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                btn.querySelector('.icon').textContent = '+';
                btn.nextElementSibling.style.maxHeight = null;
            });

            // Toggle the clicked accordion
            if (!expanded) {
                button.setAttribute('aria-expanded', 'true');
                button.querySelector('.icon').textContent = '-';
                button.nextElementSibling.style.maxHeight = button.nextElementSibling.scrollHeight + 'px';
            } else {
                button.querySelector('.icon').textContent = '+';
            }
        });
    });
});




