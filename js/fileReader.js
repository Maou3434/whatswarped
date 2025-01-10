// Select DOM elements
const statsContainer = document.getElementById('stats');

// Event listener for analyze button
analyzeButton.addEventListener('click', () => {
    const file = chatFileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            displayRawContent(fileContent);
        };
        reader.readAsText(file);
    }
});

// Function to display the raw content of the chat file
function displayRawContent(content) {
    statsContainer.innerHTML = `<pre>${content}</pre>`;
}
