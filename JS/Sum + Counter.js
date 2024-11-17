$(document).ready(function() {
    function updateTotal() {
        // Получаем значение из элемента с id "price"
        const priceElement = document.getElementById('price');
        const price = parseFloat(priceElement.textContent.replace(' р', '').trim());

        // Получаем значение из элемента input
        const quantityInput = document.querySelector('input[type="text"]');
        const quantity = parseInt(quantityInput.value, 10);

        // Умножаем и обновляем сумму
        const total = price * quantity;

        // Обновляем значение элемента с суммой
        const sumElement = document.getElementById('sum');
        sumElement.textContent = `СУММА: ${total} р`;

        const finalElement = document.getElementById('final');
        finalElement.textContent = `ИТОГ: ${total} р`;
    }

    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        updateTotal(); // Обновление суммы
        return false;
    });

    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        updateTotal(); // Обновление суммы
        return false;
    });

    // Запускаем обновление при загрузке страницы
    updateTotal();
});
