function overlay() {
    overlayText();
    overlayImage();
}

function overlayText() {
    // Get values from the form for text overlay
    const name = document.getElementById('name').value;
    const nameX = parseInt(document.getElementById('nameX').value);
    const nameY = parseInt(document.getElementById('nameY').value);

    const classValue = document.getElementById('class').value;
    const classX = parseInt(document.getElementById('classX').value);
    const classY = parseInt(document.getElementById('classY').value);

    const section = document.getElementById('section').value;
    const sectionX = parseInt(document.getElementById('sectionX').value);
    const sectionY = parseInt(document.getElementById('sectionY').value);

    const rollNo = document.getElementById('rollNo').value;
    const rollNoX = parseInt(document.getElementById('rollNoX').value);
    const rollNoY = parseInt(document.getElementById('rollNoY').value);

    // Get the overlayText element
    const overlayContainer = document.getElementById('overlayContainer');

    // Set the styles for the text elements
    const nameElement = createTextElement(name, nameX, nameY);
    const classElement = createTextElement(classValue, classX, classY);
    const sectionElement = createTextElement(section, sectionX, sectionY);
    const rollNoElement = createTextElement(rollNo, rollNoX, rollNoY);

    overlayContainer.innerHTML = ''; // Clear previous overlay
    overlayContainer.appendChild(nameElement);
    overlayContainer.appendChild(classElement);
    overlayContainer.appendChild(sectionElement);
    overlayContainer.appendChild(rollNoElement);
}

function createTextElement(text, x, y) {
    const textElement = document.createElement('div');
    textElement.innerHTML = text;
    textElement.style.position = 'absolute';
    textElement.style.top = `${y}px`;
    textElement.style.left = `${x}px`;
    textElement.style.fontSize = '44px';
    return textElement;
}

function overlayImage() {
    const userImageInput = document.getElementById('userImage');
    const overlaySize = parseInt(document.getElementById('overlaySize').value);
    const overlayX = parseInt(document.getElementById('overlayX').value);
    const overlayY = parseInt(document.getElementById('overlayY').value);

    const templateImage = document.getElementById('templateImage');
    const overlayContainer = document.getElementById('overlayContainer');

    const reader = new FileReader();

    reader.onload = function (e) {
        const userOverlayImage = document.createElement('img');
        userOverlayImage.src = e.target.result;

        // Apply clip-path to create a semi-oval shape
        userOverlayImage.onload = function () {
            const aspectRatio = userOverlayImage.width / userOverlayImage.height;
            const semiOvalClipPath = `ellipse(50% ${aspectRatio * 50}% at 50% 50%)`;
            userOverlayImage.style.clipPath = semiOvalClipPath;
            userOverlayImage.style.width = `${overlaySize}%`;
            userOverlayImage.style.position = 'absolute';
            userOverlayImage.style.top = `${overlayY}px`;
            userOverlayImage.style.left = `${overlayX}px`;

            overlayContainer.appendChild(userOverlayImage);
        };
    };

    reader.readAsDataURL(userImageInput.files[0]);
}
