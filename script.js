// Плавная прокрутка по якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Учитываем высоту фиксированного хедера
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Закрываем мобильное меню после клика по ссылке
            navList.classList.remove('active');
        }
    });
});

// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Модальное окно
const modal = document.getElementById('order-modal');
const openModalBtn = document.querySelector('.open-modal');
const closeModalBtn = document.querySelector('.close-modal');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем скролл
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Закрытие модального окна при клике вне его области
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Валидация формы
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

        // Простая валидация email
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
        // Здесь обычно код для отправки данных на сервер (например, с помощью Fetch API)
        alert(`Спасибо! Ваша заявка из формы "${formName}" отправлена. Мы свяжемся с вами в ближайшее время.`);
        this.reset(); // Очищаем форму
        if (formName === 'Заказ') {
            closeModal(); // Закрываем модальное окно заказа
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