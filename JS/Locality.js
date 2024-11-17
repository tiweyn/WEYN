const API_KEY = '363a29ca7cc2c225830eb965c284697c9d1c6965';
const API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

// Функция для получения предложений по населённым пунктам
async function fetchSuggestions(query) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                count: 5,
                // Фильтруем только населённые пункты
                // Используем типы, которые соответствуют населённым пунктам
                type: ['city', 'settlement']
            })
        });
        const data = await response.json();
        console.log('API Response:', data); // Логируем ответ для отладки

        // Фильтруем только населённые пункты
        return data.suggestions
            .map(s => s.value)
            .filter(value => value && !isAdministrativeDivision(value));
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}

// Функция для проверки, является ли текст административным делением
function isAdministrativeDivision(value) {
    // Примерный список фраз, которые указывают на административные деления
    const administrativeKeywords = [
        'область', 'р-н', 'район', 'губерния', 'округ', 'сельское поселение'
    ];

    // Проверяем, содержит ли значение одно из ключевых слов
    return administrativeKeywords.some(keyword => value.toLowerCase().includes(keyword));
}

// Функция для создания и отображения списка предложений
function createAutocomplete(input, listContainer) {
    input.addEventListener('input', async function() {
        const query = this.value;
        listContainer.innerHTML = '';

        if (query.length > 1) {
            const suggestions = await fetchSuggestions(query);
            suggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.classList.add('autocomplete-item');
                item.textContent = suggestion;
                item.addEventListener('click', function() {
                    input.value = this.textContent;
                    listContainer.innerHTML = '';
                    listContainer.style.display = 'none'; // Скрыть контейнер после выбора
                });
                listContainer.appendChild(item);
            });
        }
    });

    // Очистка списка при потере фокуса
    input.addEventListener('blur', function() {
        setTimeout(() => {
            listContainer.innerHTML = '';
            listContainer.style.display = 'none'; // Скрыть контейнер после потери фокуса
        }, 200);
    });

    // Показ списка при фокусе
    input.addEventListener('focus', function() {
        if (input.value.length > 1) {
            listContainer.style.display = 'block';
        }
    });
}

// Инициализация автозаполнения
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city');
    const cityList = document.getElementById('city-list');

    createAutocomplete(cityInput, cityList);

    const pickupInput = document.getElementById('pickupPoint');
    const pickupList = document.getElementById('pickup-list');

    createAutocomplete(pickupInput, pickupList);

    // Проверка выбора перед отправкой формы
    document.getElementById('locationForm').addEventListener('submit', function(event) {
        if (!cityInput.value) {
            event.preventDefault();
            alert('Пожалуйста, выберите населённый пункт из предложенных!');
        }
    });
});
