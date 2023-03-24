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

function sendPing() {
  console.log('Sending ping to server');
  socket.emit('ping');
}

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
                // send base64Image to server
                socket.emit('upload_image', base64Image);
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
