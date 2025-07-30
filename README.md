# WhatsWarped

**WhatsWarped** is a modern, interactive web app for visualizing and exploring your WhatsApp chat exports. Inspired by the excitement of Spotify Wrapped and YouTube Rewind, WhatsWarped turns your chat data into beautiful, animated insights.

## ✨ Features
- **Drag-and-drop or click to upload** your WhatsApp chat `.txt` file
- **Animated, engaging statistics**: total messages, word count, top emoji, most used word/phrase, longest message, media sent
- **Active hours analysis**: see when your group is most active, visualized with a bar chart
- **Participant breakdown**: select any participant to see their personal stats
- **Confetti and pop-in animations** for a celebratory, fun experience
- **Modern, responsive UI** with a card-based layout and beautiful gradients

## 🖼️ Demo
Open `index.html` in your browser and upload a WhatsApp chat export to see your stats come alive!

<img width="1549" height="1013" alt="image" src="https://github.com/user-attachments/assets/b95728d7-05c7-48dd-9cad-404953bc91a6" />

## 🚀 Getting Started
1. **Export your WhatsApp chat** (without media) from your phone:
   - In WhatsApp, open the chat > More > Export chat > WITHOUT media > Save as `.txt`
2. **Download or clone this repo or visit https://maou3434.github.io/whatswarped/**
3. **Open `index.html` in your browser** (no server needed)
4. **Upload your chat file** and enjoy your personalized stats!

## 📁 Project Structure
```
whatswarped/
  index.html           # Main app UI
  styles.css           # Modern, responsive styles
  js/
    chatParser.js      # Parses WhatsApp chat exports
    generalStats.js    # Calculates and animates general statistics
    wordEmojiStats.js  # Tracks word/emoji/phrase frequencies
    fileReader.js      # Handles file input
    fileUpload.js      # (Legacy) file upload logic
    scrollHandler.js   # Handles scroll and reveal animations
  README.md            # This file
```

## 📝 Supported WhatsApp Export Format
- English WhatsApp `.txt` exports (without media)
- Format: `DD/MM/YY, HH:MM - Name: Message`
- Example:
  ```
  12/05/23, 14:32 - Alice: Hello!
  12/05/23, 14:33 - Bob: Hi Alice 😊
  ```

## 🛠️ Customization
- All logic is in the `js/` folder and styles in `styles.css`.
- You can easily add new stats, change the look, or add dark mode.

## 🤝 Contributing
Pull requests and suggestions are welcome! Please open an issue or PR for feedback, features, or bug fixes.

## 🙏 Credits
- [Chart.js](https://www.chartjs.org/) for charts
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
- Inspired by Spotify Wrapped, YouTube Rewind, and the WhatsApp community

---
Enjoy your WhatsApp Wrapped! 🎉
