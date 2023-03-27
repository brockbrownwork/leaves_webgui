const socket = io('http://localhost:8000');
  
socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
  document.getElementById('server-status').style.color = 'green';
  document.getElementById('server-status').textContent = 'Connected';
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  document.getElementById('server-status').style.color = 'red';
  document.getElementById('server-status').textContent = 'Disconnected';
});

socket.on('pong', () => {
  console.log('Received pong from server');
});

socket.on('message', (message) => {
    console.log('Server:', message);
});

socket.on('image_processed', (base64Image) => {
    console.log('Received processed image from server');
    const img = document.createElement('img');
    img.src = base64Image;
    img.style.maxWidth = '100%';
    displayImages([img], 'received-images');
});

function sendPing() {
  console.log('Sending ping to server');
  socket.emit('ping');
}

function isValidFileType(file) {
    const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const validCsvExtensions = ['csv'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    return (
        validImageExtensions.includes(fileExtension) ||
        validCsvExtensions.includes(fileExtension)
    );
}

document.getElementById('image-upload').addEventListener('change', (event) => {
    const files = event.target.files;
    const images = [];
    let loadedImages = 0;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!isValidFileType(file)) {
                console.log('Invalid file type: ' + file.name)
                continue; // If the file type is not valid, skip processing this file
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                // send base64Image to server
                socket.emit('upload_image', base64Image);
                const img = document.createElement('img');
                img.src = base64Image;
                img.style.maxWidth = '100%';
                images.push(img);
                loadedImages++;
                if (loadedImages === files.length) {
                    // All images have been loaded
                    displayImages(images, 'uploaded-images');
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

const displayImages = (images, box) => {
    let container = document.querySelector('#uploaded-images');
    if (!container) {
      container = document.createElement('div');
      container.id = 'uploaded-images';
      document.body.appendChild(container);
    }
    images.forEach(img => {
      container.appendChild(img);
    });
  };
  
