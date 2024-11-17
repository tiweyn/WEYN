function validateInput(event, regex, pattern) {
    const input = event.target;
    const value = input.value;

    if (!regex.test(value)) {
        input.setCustomValidity(pattern);
    } else {
        input.setCustomValidity("");
    }

    // Принудительно проверяем валидность
    input.reportValidity();
}

function restrictInput(event, regex) {
    if (!regex.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && 
        event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        event.preventDefault();
    }
}

function formatPhoneNumber(value) {
    // Убираем все не цифры и "+"
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

document.addEventListener('DOMContentLoaded', () => {
    const fullNameInput = document.getElementById('fullName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const nicknameInput = document.getElementById('nickname');

    const phoneNumberRegex = /^(?:\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}|8 \(\d{3}\) \d{3}-\d{2}-\d{2})$/;
    const fullNameRegex = /^[А-Яа-яЁё\-]+\s[А-Яа-яЁё\-]+\s[А-Яа-яЁё\-]+$/;
    const nicknameRegex = /^@[A-Za-z0-9]*$/;

    // Добавляем атрибут required для полей
    fullNameInput.setAttribute('required', '');
    phoneNumberInput.setAttribute('required', '');
    nicknameInput.setAttribute('required', '');

    fullNameInput.addEventListener('input', (event) => validateInput(event, fullNameRegex, "Напишите действительные фамилию, имя, отчество"));
    
    phoneNumberInput.addEventListener('input', (event) => {
        const formattedValue = formatPhoneNumber(event.target.value);
        event.target.value = formattedValue;
        validateInput(event, phoneNumberRegex, "Телефон должен быть в формате +7 (000) 000-00-00 или 8 (000) 000-00-00");
    });

    nicknameInput.addEventListener('input', (event) => validateInput(event, nicknameRegex, "Ник должен начинаться с '@' и содержать только английские буквы и цифры"));

    fullNameInput.addEventListener('keydown', (event) => restrictInput(event, /[А-Яа-яЁё\s\-]/));
    phoneNumberInput.addEventListener('keydown', (event) => restrictInput(event, /[0-9+\s]/));
    nicknameInput.addEventListener('keydown', (event) => restrictInput(event, /[A-Za-z0-9_@]/));
});
