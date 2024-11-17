document.addEventListener('DOMContentLoaded', () => {
    const fullNameInput = document.getElementById('fullName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const nicknameInput = document.getElementById('nickname');
    const quantityInput = document.getElementById('quantity');
    const cityInput = document.getElementById('city');
    const pickupPointInput = document.getElementById('pickupPoint');
    const sizeElement = document.getElementById('size');
    const totalElement = document.getElementById('sum');
    const agreementCheckbox = document.getElementById('agreement'); // Чекбокс для согласия

    // Функция для проверки ввода в поля
    function restrictInput(event, regex) {
        if (!regex.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && 
            event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
            event.preventDefault();
        }
    }

    // Функция для форматирования номера телефона
    function formatPhoneNumber(value) {
        let numbers = value.replace(/[^\d+]/g, '');

        if (numbers.startsWith('+')) {
            numbers = numbers.replace(/\D/g, ''); 
            if (numbers.length > 1) {
                numbers = `+${numbers}`;
            }
            if (numbers.length > 2) {
                numbers = numbers.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
            }
            return numbers;
        }

        numbers = numbers.replace(/\D/g, '');
        if (numbers.length > 0) {
            numbers = numbers.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
        }
        return numbers;
    }

    // Регулярные выражения для валидации
    const phoneNumberRegex = /^(?:\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}|8 \(\d{3}\) \d{3}-\d{2}-\d{2})$/;
    const fullNameRegex = /^[А-Яа-яЁё\-]+\s[А-Яа-яЁё\-]+\s[А-Яа-яЁё\-]+$/;
    const nicknameRegex = /^@[A-Za-z0-9_]*$/;
    const quantityRegex = /^[0-9]+$/;

    // Слушатели событий для ограничения ввода
    fullNameInput.addEventListener('keydown', (event) => restrictInput(event, /[А-Яа-яЁё\s\-]/)); 
    phoneNumberInput.addEventListener('keydown', (event) => restrictInput(event, /[0-9+\s]/)); 
    nicknameInput.addEventListener('keydown', (event) => restrictInput(event, /[A-Za-z0-9_@]/)); 
    quantityInput.addEventListener('keydown', (event) => restrictInput(event, /[0-9]/)); 
    cityInput.addEventListener('keydown', (event) => restrictInput(event, /[А-Яа-яЁё\s\-]/)); 
    pickupPointInput.addEventListener('keydown', (event) => restrictInput(event, /[А-Яа-яЁё\s\-]/)); 

    // Обработчик ввода для никнейма
    nicknameInput.addEventListener('input', function() {
        let value = nicknameInput.value.trim();
        if (value && !value.startsWith('@')) {
            nicknameInput.value = '@' + value;
        }
    });

    let isSubmitted = false;

    // Проверка и отправка данных
    document.getElementById('submitBtn').addEventListener('click', function() {
        if (isSubmitted) {
            alert('Данные уже отправлены!');
            return;
        }

        const size = sizeElement ? sizeElement.textContent.replace(/^РАЗМЕР:\s*/, '').trim() : '';
        const quantity = quantityInput.value.trim();
        const total = totalElement ? totalElement.textContent.replace(/^СУММА:\s*/, '').replace(/\s*р$/, '').trim() : '';
        const fullName = fullNameInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();
        const nickname = nicknameInput.value.trim();
        const city = cityInput.value.trim();
        const pickupPoint = pickupPointInput.value.trim();

        // Проверка на обязательные поля
        if (!size || !quantity || !total || !fullName || !phoneNumber || !nickname || !city || !pickupPoint) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        // Валидация телефона
        if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
            alert('Неверный формат телефона. Пожалуйста, введите корректный номер.');
            return;
        }

        // Валидация ФИО
        if (!fullNameRegex.test(fullName)) {
            alert('Пожалуйста, введите корректное ФИО.');
            return;
        }

        // Валидация никнейма
        if (!nicknameRegex.test(nickname)) {
            alert('Неверный формат никнейма. Он должен начинаться с "@" и содержать только буквы и цифры.');
            return;
        }

        // Проверка состояния чекбокса
        if (!agreementCheckbox.checked) {
            alert('Пожалуйста, примите условия.');
            return;
        }

        const message = `<b>📏РАЗМЕР:</b> ${size}\n<b>📊КОЛИЧЕСТВО:</b> ${quantity}\n<b>💶ИТОГ:</b> ${total}\n<b>🧟ФИО:</b> ${fullName}\n<b>🔢ТЕЛЕФОН:</b> ${phoneNumber}\n<b>📱TELEGRAM:</b> ${nickname}\n<b>🌍НАСЕЛ. ПУНКТ:</b> ${city}\n<b>🌃ПУНКТ ПОЛУЧ.:</b> ${pickupPoint}`;

        const botToken = '7484570889:AAGYOOIBh8rgzkRo0yG_QgokfzmNc5iPYO8';
        const chatId = '1038596531';
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=HTML`;

        // Отправка данных на Telegram
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    isSubmitted = true;
                    alert('Данные успешно отправлены!');
                } else {
                    alert('Ошибка при отправке данных.');
                }
            })
            .catch(error => {
                alert('Ошибка при отправке данных.');
                console.error(error);
            });
    });

    // Форматирование номера телефона при изменении значения
    phoneNumberInput.addEventListener('input', function () {
        phoneNumberInput.value = formatPhoneNumber(phoneNumberInput.value);
    });
});
