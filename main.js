document.getElementById('image-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            console.log('Base64 Image:', base64Image);

            document.getElementById('preview').src = base64Image;
        };
        reader.readAsDataURL(file);
    }
});
