// Установка начальной цены
let price = 1111;

// Находим элемент по ID и обновляем его текстовое содержимое
document.getElementById('price').textContent = price + ' р';

// Функция для обновления цены (пример)
function updatePrice(newPrice) {
    price = newPrice;
    document.getElementById('price').textContent = price + ' р';
}
