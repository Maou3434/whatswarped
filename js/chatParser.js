// Parse the chat content and extract messages
function parseChat(chatContent) {
    const messageRegex = /^(\d{2}\/\d{2}\/\d{2}), (\d{2}:\d{2}) - (.+?): (.+)$/;
    const messages = chatContent.split("\n");
    const parsedData = [];

    for (const line of messages) {
        const match = line.match(messageRegex);
        if (match) {
            const [, date, time, sender, message] = match;
            parsedData.push({ date, time, sender, message });
        }
    }

    return parsedData;
}

// Display parsed chat data in a table
function displayParsedData(parsedData) {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ""; // Clear previous data

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headers = ["Date", "Time", "Sender", "Message"];
    headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    parsedData.forEach(({ date, time, sender, message }) => {
        const row = document.createElement("tr");

        [date, time, sender, message].forEach((text) => {
            const td = document.createElement("td");
            td.textContent = text;
            row.appendChild(td);
        });

        table.appendChild(row);
    });

    tableContainer.appendChild(table);
}
