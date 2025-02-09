const saveDiaryButton = document.getElementById('saveDiary');
const diaryEntry = document.getElementById('diaryEntry');

// Загружаем сохраненную запись при загрузке страницы
window.onload = () => {
    const savedEntry = localStorage.getItem('diaryEntry');
    if (savedEntry) {
        diaryEntry.value = savedEntry;
    }
};

// Сохраняем запись в localStorage
saveDiaryButton.addEventListener('click', () => {
    localStorage.setItem('diaryEntry', diaryEntry.value);
    alert('Запись сохранена!');
}); 