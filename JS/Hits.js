// Функция для создания и отображения списка предложений
function createAutocomplete(input, listContainer) {
    input.addEventListener('input', async function() {
        const query = this.value;
        listContainer.innerHTML = '';

        if (query.length > 1) {
            const suggestions = await fetchSuggestions(query);
            if (suggestions.length > 0) {
                listContainer.style.display = 'block'; // Показываем контейнер при наличии предложений
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
