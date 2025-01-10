// script.js

import { handleFileInput, readFile } from './fileHandler.js';
import { analyzeChat } from './chatAnalyzer.js';
import { displayResults } from './uiUpdater.js';

document.getElementById('chatFileInput').addEventListener('change', handleFileInput);

document.getElementById('analyzeButton').addEventListener('click', () => {
    const file = document.getElementById('chatFileInput').files[0];
    if (file) {
        readFile(file, (chatData) => {
            analyzeChat(chatData, displayResults);
        });
    }
});
