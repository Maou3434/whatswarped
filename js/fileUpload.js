// Select DOM elements
const chatFileInput = document.getElementById('chatFile');
const analyzeButton = document.getElementById('analyzeButton');
const fileError = document.getElementById('fileError');

// Event listener for file input
chatFileInput.addEventListener('change', () => {
    const file = chatFileInput.files[0];
    if (file && file.type === 'text/plain') {
        fileError.style.display = 'none';
        analyzeButton.disabled = false;
    } else {
        fileError.style.display = 'block';
        analyzeButton.disabled = true;
    }
});
