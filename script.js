// Отримання елементів DOM
const briefModal = document.getElementById('briefModal');
const openBriefFormBtn = document.getElementById('openBriefFormBtn');
const closeModalBtn = document.getElementById('closeModalBtn'); // Додано отримання кнопки закриття
const contactForm = document.getElementById('contactForm'); // Отримання форми
const successMessage = document.getElementById('successMessage'); // Отримання елемента повідомлення
const currentYearSpan = document.getElementById('currentYear'); // Елемент для року

// Функція для відкриття модального вікна
function openModal() {
    if (briefModal) {
        briefModal.style.display = 'flex'; // Показати модальне вікно як flex-контейнер
        // Скидання форми та приховування повідомлення про успіх при кожному відкритті
        if (contactForm) contactForm.reset();
        if (successMessage) successMessage.classList.add('hidden');
    }
}

// Функція для закриття модального вікна
function closeModal() {
    if (briefModal) {
        briefModal.style.display = 'none'; // Приховати модальне вікно
    }
}

// Встановлення обробників подій, якщо елементи існують
if (openBriefFormBtn) {
    openBriefFormBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Закрити модальне вікно, якщо клік поза його вмістом
window.addEventListener('click', (event) => {
    if (event.target === briefModal) {
        closeModal();
    }
});

// Обробка відправки форми
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Запобігти стандартній відправці форми

        // Тут можна додати логіку для відправки даних на сервер (наприклад, через fetch API)
        console.log('Форма відправлена!');

        // Отримати дані форми
        const formData = new FormData(this);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        console.log('Дані форми:', data);

        // Показати повідомлення про успіх
        if (successMessage) {
            successMessage.classList.remove('hidden');
        }

        // Очистити форму після невеликої затримки, щоб користувач встиг побачити повідомлення
        // Або можна закривати модальне вікно і скидати форму після того, як користувач закриє повідомлення
        // Для простоти, поки що просто очистимо і закриємо.
        // closeModal(); // Можна закривати одразу або після повідомлення
        // this.reset(); // Очистити форму

        // Можна зробити так, щоб повідомлення зникало через деякий час, а потім закривалось модальне вікно
        setTimeout(() => {
            if (successMessage) {
                successMessage.classList.add('hidden');
            }
            closeModal();
            this.reset();
        }, 3000); // Закрити через 3 секунди
    });
}

// Встановлення поточного року в футері
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Плавний скрол для якірних посилань (якщо не використовується scroll-smooth з Tailwind CSS)
// Якщо scroll-smooth працює, цей код не обов'язковий.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hrefAttribute = this.getAttribute('href');
        // Перевіряємо, чи посилання не є просто "#" (часто використовується для заглушок)
        if (hrefAttribute && hrefAttribute.length > 1) {
            const targetElement = document.querySelector(hrefAttribute);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

