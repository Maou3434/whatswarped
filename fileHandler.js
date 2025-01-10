// fileHandler.js

export function handleFileInput(event) {
    const file = event.target.files[0];
    const analyzeButton = document.getElementById('analyzeButton');
    
    if (file && file.name.endsWith('.txt')) {
        // Enable the Analyze button
        analyzeButton.disabled = false;
    } else {
        // Disable the Analyze button if the file is not valid
        analyzeButton.disabled = true;
    }
}

export function readFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const chatData = event.target.result;
        callback(chatData);
    };
    reader.readAsText(file);
}
