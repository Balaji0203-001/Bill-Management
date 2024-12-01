document.getElementById('billForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const url = 'https://script.google.com/macros/s/AKfycbxr25ErZ1gKhbE03-mfI4kLxl44MEXEmSTRsqcy9VSIM9HNMlsIAby7Mwa1aSpX23BxiA/exec';  // Replace with your Web App URL

    const formData = new FormData(this);
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('result').innerText = 'Bill submitted successfully!';
        this.reset();
    })
    .catch(error => {
        document.getElementById('result').innerText = 'Error submitting bill!';
        console.error('Error:', error);
    });
});
