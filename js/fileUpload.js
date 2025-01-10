const chatFileInput = document.getElementById("chatFileInput");
const analyzeButton = document.getElementById("analyzeButton");

chatFileInput.addEventListener("change", () => {
    if (chatFileInput.files.length > 0) {
        analyzeButton.disabled = false;
    } else {
        analyzeButton.disabled = true;
    }
});
