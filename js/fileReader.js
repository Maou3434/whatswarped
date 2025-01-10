// Event listener for analyze button
analyzeButton.addEventListener("click", () => {
    const file = chatFileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            const parsedData = parseChat(fileContent);

            // Display parsed table
            displayParsedData(parsedData);

            // Calculate and display general stats
            const generalStats = calculateGeneralStats(parsedData);
            displayGeneralStats(generalStats);
        };
        reader.readAsText(file);
    }
});
