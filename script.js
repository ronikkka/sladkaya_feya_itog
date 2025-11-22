
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            navList.classList.remove('active');
        }
    });
});

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

const orderModal = document.getElementById('order-modal');
const galleryModal = document.getElementById('gallery-modal');
const openModalBtn = document.querySelector('.open-modal');

function openOrderModal() {
    orderModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalElement) {
    modalElement.style.display = 'none';
    document.body.style.overflow = 'auto';
}

openModalBtn.addEventListener('click', openOrderModal);

document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        closeModal(orderModal);
    }
    if (e.target === galleryModal) {
        closeModal(galleryModal);
    }
});

const cakesData = {
    1: {
        title: "Детский торт с единорогом",
        description: "Волшебный торт для самого сказочного дня рождения! Нежный бисквит, крем чиз и яркое оформление.",
        price: "от 2 800 ₽"
    },
    2: {
        title: "Свадебный торт",
        description: "Элегантный трехъярусный торт для вашего особенного дня. Классическое сочетание ванили и красного бархата.",
        price: "от 8 000 ₽"
    },
    3: {
        title: "Торт на юбилей",
        description: "Торжественный торт для важного события. Изысканный дизайн и насыщенный вкус шоколада и вишни.",
        price: "от 3 500 ₽"
    },
    4: {
        title: "Макаруны",
        description: "Нежные французские пирожные с разнообразными начинками. Идеально для кофе-брейка или подарка.",
        price: "от 150 ₽/шт"
    },
    5: {
        title: "Торт Принцесса",
        description: "Роскошный торт в розовых тонах для настоящей принцессы. Ванильный бисквит с ягодным муссом.",
        price: "от 3 200 ₽"
    },
    6: {
        title: "Бенто торт",
        description: "Маленький торт для одного человека. Идеальный подарок для близких или себя любимой!",
        price: "от 1 200 ₽"
    }
};

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const cakeId = item.getAttribute('data-cake');
        const cake = cakesData[cakeId];
        
        document.getElementById('gallery-image').src = item.querySelector('img').src;
        document.getElementById('gallery-image').alt = item.querySelector('img').alt;
        document.getElementById('gallery-title').textContent = cake.title;
        document.getElementById('gallery-description').textContent = cake.description;
        document.getElementById('gallery-price').textContent = `Цена: ${cake.price}`;
        
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

document.querySelector('.open-order-from-gallery').addEventListener('click', () => {
    closeModal(galleryModal);
    setTimeout(() => {
        openOrderModal();
    }, 300);
});

const contactForm = document.getElementById('contact-form');
const orderForm = document.getElementById('order-form');

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ddd';
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = 'red';
                alert('Пожалуйста, введите корректный email адрес.');
            }
        }
    });

    return isValid;
}

function handleFormSubmit(e, formName) {
    e.preventDefault();

    if (validateForm(this)) {
        alert(`Спасибо! Ваша заявка из формы "${formName}" отправлена. Мы свяжемся с вами в ближайшее время.`);
        this.reset();
        if (formName === 'Заказ') {
            closeModal(orderModal);
        }
    } else {
        alert('Пожалуйста, заполните все обязательные поля правильно.');
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormSubmit.call(contactForm, e, 'Контакты'));
}

if (orderForm) {
    orderForm.addEventListener('submit', (e) => handleFormSubmit.call(orderForm, e, 'Заказ'));
}