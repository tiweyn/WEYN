document.addEventListener('DOMContentLoaded', function() {
    let isSubmitted = false; // Флаг для проверки отправки данных

    document.getElementById('submitBtn').addEventListener('click', function() {
        if (isSubmitted) {
            alert('Данные уже отправлены!');
            return; // Прерываем выполнение, если данные уже были отправлены
        }

        // Сбор данных формы
        const sizeElement = document.getElementById('size');
        const size = sizeElement ? sizeElement.textContent.replace(/^РАЗМЕР:\s*/, '').trim() : ''; // Получаем размер без лишних пробелов
        const quantity = document.querySelector('input[type="text"]').value.trim(); // Количество
        const totalElement = document.getElementById('sum');
        const total = totalElement ? totalElement.textContent.replace(/^СУММА:\s*/, '').replace(/\s*р$/, '').trim() : ''; // Итог без 'р'
        const fullName = document.getElementById('fullName').value.trim(); // ФИО
        const phoneNumber = document.getElementById('phoneNumber').value.trim(); // Телефон
        const nickname = document.getElementById('nickname').value.trim(); // Telegram
        const city = document.getElementById('city').value.trim(); // Населенный пункт
        const pickupPoint = document.getElementById('pickupPoint').value.trim(); // Пункт получения

        // Проверка на обязательные поля
        if (!size || !quantity || !total || !fullName || !phoneNumber || !nickname || !city || !pickupPoint) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return; // Прерываем выполнение, если есть незаполненные поля
        }

        // Валидация телефона, только если все поля заполнены
        const phoneRegex = /^\+?\d{10,15}$/;
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            alert('Неверный формат телефона. Пожалуйста, введите корректный номер.');
            return; // Прерываем выполнение, если номер телефона неверный
        }

        // Формирование сообщения с жирным шрифтом
        const message = `<b>📏РАЗМЕР:</b> ${size}\n<b>📊КОЛИЧЕСТВО:</b> ${quantity}\n<b>💶ИТОГ:</b> ${total}\n<b>🧟ФИО:</b> ${fullName}\n<b>🔢ТЕЛЕФОН:</b> ${phoneNumber}\n<b>📱TELEGRAM:</b> ${nickname}\n<b>🌍НАСЕЛ. ПУНКТ:</b> ${city}\n<b>🌃ПУНКТ ПОЛУЧ.:</b> ${pickupPoint}`;

        // Формирование URL для запроса к Telegram Bot API
        const botToken = '7484570889:AAGYOOIBh8rgzkRo0yG_QgokfzmNc5iPYO8'; // Ваш токен
        const chatId = '1038596531'; // Ваш Chat ID
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=HTML`;

        // Отправка данных на Telegram
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    isSubmitted = true; // Устанавливаем флаг отправки
                    alert('Данные успешно отправлены!');
                } else {
                    alert('Ошибка при отправке данных.');
                }
            })
            .catch(error => {
                alert('Ошибка при отправке данных.');
                console.error('Ошибка:', error);
            });
    });
});
