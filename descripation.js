
let productData = [];

function fetchData() {
    fetch("http://localhost:3000/product")
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
        .catch((err) => console.error(err)); // Use console.error for better indication of errors
}

fetchData();

function renderProductList(data) {
    const mainSection = document.getElementById('data-list-wrapper') || document.querySelector('.col-10 .row');
    if (!data || data.length === 0) {
        mainSection.innerHTML = "<p>No products available</p>";
    } else {
        mainSection.innerHTML = data.map(el => createProductCard(el.image, el.title, el.price)).join("");
    }
}

function createProductCard(image, title, price) {
    return `
        <div class="product-image" style="height: 650px;width: 85%;margin-left: 15%;border-radius: 20px;">
            <img src="${image}" alt="${title}" style="height: 700px;width:100%;border-radius: 20px;">
        </div>
        <h1 style="color: rgb(121, 35, 46);font-weight: 100;font-family:serif;">${title}</h1>
        <span style="font-size: 27px;color: rgba(51, 51, 51, 0.583);">$${price}</span><br>
    `;
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
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
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


