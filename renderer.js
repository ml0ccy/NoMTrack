const countDisplay = document.getElementById('count');
const incrementButton = document.getElementById('increment');
const resetProgressButton = document.getElementById('resetProgressButton'); // Новая кнопка
const messageDisplay = document.createElement('p'); // Создаем элемент для сообщения
messageDisplay.className = 'message'; // Добавляем класс
document.querySelector('.container').appendChild(messageDisplay); // Добавляем его в контейнер

const motivationalMessages = {
    3: "Отлично! Вы преодолели первую ступень! Дальше - легче!",
    5: "Вы на правильном пути! 5 дней без мастурбации!",
    7: "Супер! 7 дней без мастурбации — это здорово!",
    11: "Вы молодец! 11 дней без мастурбации!",
    14: "14 дней без мастурбации! Продолжай в том же духе!",
    18: "18 дней без мастурбации! Осталось совсем немного!",
    21: "21 день без мастурбации! Ты прошел испытание! Теперь можешь расслабиться!"
};

// Добавляем стиль, чтобы текст нельзя было выделить
const style = document.createElement('style');
style.textContent = `
    .message {
        user-select: none; /* Запретить выделение текста */
    }
`;
document.head.appendChild(style);

// Загружаем сохраненное количество дней при загрузке страницы
window.onload = () => {
    const savedCount = localStorage.getItem('currentCount');
    countDisplay.innerText = savedCount ? savedCount : 0; // Устанавливаем сохраненное значение или 0
};

// Переменные для отслеживания нажатий
let clickCount = 0;
const devToolsButton = document.getElementById('devToolsButton');

// Обработчик для кнопки "Засчитать день"
incrementButton.addEventListener('click', () => {
    let currentCount = parseInt(countDisplay.innerText) || 0; // Если нет сохраненного значения, устанавливаем 0
    currentCount += 1; // Увеличиваем счетчик
    countDisplay.innerText = currentCount; // Обновляем отображение

    // Сохраняем текущее количество дней в localStorage
    localStorage.setItem('currentCount', currentCount);

    // Отправляем событие для обновления
    window.electron.send('increment-day');
});

// Обработчик для кнопки "Сбросить прогресс"
resetProgressButton.addEventListener('click', () => {
    localStorage.removeItem('currentCount'); // Удаляем сохраненное значение
    countDisplay.innerText = 0; // Сбрасываем отображение
    window.electron.send('increment-day'); // Отправляем событие для сброса
});

// Обработчик для кнопки "Прочие функции"
const moreOptionsButton = document.getElementById('moreOptions');
moreOptionsButton.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 7) {
        devToolsButton.style.display = 'block'; // Показываем кнопку DevTools
    }
});

// Пример работы с кодировкой
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8');

const encodedData = encoder.encode('Пример текста');
const decodedData = decoder.decode(encodedData);
console.log(decodedData); // "Пример текста"

let maxDays = 0; // Переменная для хранения максимального количества дней

window.electron.receive('update-count', (count) => {
    countDisplay.classList.add('animate');
    countDisplay.innerText = count;

    setTimeout(() => {
        countDisplay.classList.remove('animate');
    }, 300);

    // Плавная анимация для сообщения
    messageDisplay.classList.add('animate');
    setTimeout(() => {
        messageDisplay.classList.remove('animate');
    }, 300);

    // Обновление графика
    if (count > maxDays) {
        maxDays = count; // Обновляем максимальное количество дней
    }

    // Проверяем, есть ли мотивационное сообщение для текущего количества дней
    if (motivationalMessages[count]) {
        messageDisplay.innerText = motivationalMessages[count];
    } else {
        messageDisplay.innerText = ""; // Очищаем сообщение, если нет
    }
});

const shareButton = document.getElementById('share');

shareButton.addEventListener('click', () => {
    const message = `Я продержался ${countDisplay.innerText} дней без мастурбации! Присоединяйтесь ко мне!`;
    
    navigator.clipboard.writeText(message)
        .then(() => {
            alert('Сообщение скопировано в буфер обмена! Поделитесь им с друзьями!');
        })
        .catch(err => {
            console.error('Ошибка при копировании:', err);
        });
});

const infoButton = document.getElementById('info');

infoButton.addEventListener('click', () => {
    window.location.href = 'info.html'; // Перенаправление на новый файл
});

const diaryButton = document.getElementById('diary');

diaryButton.addEventListener('click', () => {
    window.location.href = 'diary.html'; // Перенаправление на новый файл
});

devToolsButton.addEventListener('click', () => {
    window.electron.ipcRenderer.send('open-devtools'); // Отправляем событие для открытия DevTools
}); 