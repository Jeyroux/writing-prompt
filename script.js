document.addEventListener('DOMContentLoaded', () => {
    const dynamicImage = document.getElementById('dynamic-image');
    const dynamicText = document.getElementById('dynamic-text');

    // --- Configuration ---
    const imagePaths = [
        'images/weekly_picture.png',
        'images/weekly_picture1.png',
        'images/weekly_picture2.png',
        //'images/image3.gif',
        // Add all your image paths here
        // e.g., 'images/my-awesome-pic.jpeg',
        // 'images/another-one.webp'
    ];
    const textFilePath = 'messages.txt';
    // --- End Configuration ---

    // Function to get a random item from an array
    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Function to set a random image
    function setRandomImage() {
        const randomImagePath = getRandomItem(imagePaths);
        dynamicImage.src = randomImagePath;
    }

    // Function to set a random text string from the file
    async function setRandomText() {
        try {
            const response = await fetch(textFilePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const textContent = await response.text();
            const textLines = textContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
            if (textLines.length > 0) {
                dynamicText.textContent = 'You are a reporter, writing a story with the title "' + getRandomItem(textLines) + '".';
            } else {
                dynamicText.textContent = "No messages found in the text file.";
            }
        } catch (error) {
            console.error("Error fetching or parsing text file:", error);
            dynamicText.textContent = "Failed to load message.";
        }
    }

    // Call the functions to set the content when the page loads
    setRandomImage();
    setRandomText();
});