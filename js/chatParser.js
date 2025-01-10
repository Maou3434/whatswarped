// Regular expression to match WhatsApp message format
const messageRegex = /(\d{2}\/\d{2}\/\d{2}), (\d{2}:\d{2}) - (.*?): (.+)/;

// Function to parse chat content
function parseChat(content) {
    const lines = content.split('\n');
    const parsedData = lines.map((line) => {
        const match = line.match(messageRegex);
        if (match) {
            return {
                date: match[1],
                time: match[2],
                sender: match[3],
                message: match[4],
            };
        }
        return null; // Skip lines that don't match the format
    }).filter((entry) => entry !== null);
    return parsedData;
}

// Function to display parsed data in a table
function displayParsedData(parsedData) {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Sender</th>
                <th>Message</th>
            </tr>
        </thead>
        <tbody>
            ${parsedData.map((entry) => `
                <tr>
                    <td>${entry.date}</td>
                    <td>${entry.time}</td>
                    <td>${entry.sender}</td>
                    <td>${entry.message}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    statsContainer.innerHTML = ''; // Clear previous content
    statsContainer.appendChild(table);
}

// Integrate parsing and display logic with fileReader.js
analyzeButton.addEventListener('click', () => {
    const file = chatFileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            const parsedData = parseChat(fileContent);
            displayParsedData(parsedData);
        };
        reader.readAsText(file);
    }
});
