document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('billForm');
    const imageInput = document.getElementById('billImage');
    const imagePreview = document.getElementById('imagePreview');
    const resultMessage = document.getElementById('result');

    // Image Preview Functionality
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            
            reader.readAsDataURL(file);
        }
    });

    // Form Submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const imageFile = formData.get('billImage');
        
        // Convert image to base64
        const reader = new FileReader();
        reader.onload = async function(e) {
            const base64Image = e.target.result.split(',')[1];
            
            // Prepare data to send
            const data = {
                billName: formData.get('billName'),
                billNumber: formData.get('billNumber'),
                description: formData.get('description'),
                billDate: formData.get('billDate'),
                billAmount: formData.get('billAmount'),
                payerName: formData.get('payerName'),
                returnPaid: formData.get('returnPaid'),
                base64: base64Image,
                type: imageFile.type,
                name: imageFile.name
            };
            
            try {
                // Replace with your Google Apps Script Web App URL
                const response = await fetch('https://script.google.com/macros/s/AKfycbx3RRrE3dmysOWFf40jEXjXKagnYatsstAyPy3huTl-lZnuxrJgLIUCkNrjbMT-IZxy/exec', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                
                const result = await response.text();
                resultMessage.textContent = result;
                resultMessage.style.color = 'green';
                
                // Reset form and preview
                form.reset();
                imagePreview.style.display = 'none';
            } catch (error) {
                console.error('Error:', error);
                resultMessage.textContent = 'Submission failed. Please try again.';
                resultMessage.style.color = 'red';
            }
        };
        
        reader.readAsDataURL(imageFile);
    });
});