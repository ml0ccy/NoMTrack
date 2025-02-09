const countDisplay = document.getElementById('count');
const incrementButton = document.getElementById('increment');
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

incrementButton.addEventListener('click', () => {
    window.electron.send('increment-day');
});

// Пример работы с кодировкой
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8');

const encodedData = encoder.encode('Пример текста');
const decodedData = decoder.decode(encodedData);
console.log(decodedData); // "Пример текста"

window.electron.receive('update-count', (count) => {
    countDisplay.classList.add('animate');
    countDisplay.innerText = count;

    setTimeout(() => {
        countDisplay.classList.remove('animate');
    }, 300);

    // Проверяем, есть ли мотивационное сообщение для текущего количества дней
    if (motivationalMessages[count]) {
        messageDisplay.innerText = motivationalMessages[count];
    } else {
        messageDisplay.innerText = ""; // Очищаем сообщение, если нет
    }
}); 