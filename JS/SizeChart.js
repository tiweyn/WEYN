document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');

    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const selectedSize = document.querySelector('input[name="test"]:checked')?.value;
            if (selectedSize) {
                localStorage.setItem('selectedSize', selectedSize);
            }
        });
    }

    // Отображение выбранного размера на второй странице
    const sizeElement = document.getElementById('size');
    if (sizeElement) {
        const selectedSize = localStorage.getItem('selectedSize');
        if (selectedSize) {
            sizeElement.innerText = `РАЗМЕР: ${selectedSize}`;
        }
    }
});
