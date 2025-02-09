const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const moment = require('moment-timezone');

let mainWindow;
let noMasturbationDays = 0;
let lastDay = moment().tz("Europe/Moscow").startOf('day');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    setInterval(checkReset, 60000); // Проверка каждую минуту
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

function checkReset() {
    const now = moment().tz("Europe/Moscow").startOf('day');
    if (!now.isSame(lastDay)) {
        noMasturbationDays = 0; // Сброс счетчика
        lastDay = now;
        mainWindow.webContents.send('update-count', noMasturbationDays);
    }
}

ipcMain.on('increment-day', () => {
    noMasturbationDays++;
    lastDay = moment().tz("Europe/Moscow").startOf('day');
    mainWindow.webContents.send('update-count', noMasturbationDays);
});

ipcMain.on('open-devtools', (event) => {
    mainWindow.webContents.openDevTools(); // Открываем DevTools
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
