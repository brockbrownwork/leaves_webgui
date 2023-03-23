document.getElementById('image-upload').addEventListener('change', (event) => {
    const files = event.target.files;
    const images = [];
    let loadedImages = 0;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                console.log('Base64 Image:', base64Image);
                copyToClipboard(base64Image);

                const img = document.createElement('img');
                img.src = base64Image;
                img.style.maxWidth = '100%';
                images.push(img);
                loadedImages++;
                if (loadedImages === files.length) {
                    // All images have been loaded
                    displayImages(images);
                }
            };
            reader.readAsDataURL(file);
        }
    }
});

const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
};

const displayImages = images => {
    const container = document.createElement('div');
    container.classList.add('image-container');
    images.forEach(img => {
        container.appendChild(img);
    });
    document.body.appendChild(container);
};
