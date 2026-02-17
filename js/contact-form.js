// Contact Form Handling

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!contactForm) return;
    
    // Form Validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.remove();
        });
        
        let isValid = true;
        
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!message) {
            showError('message', 'Message is required');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Submit to Formspree
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success
                contactForm.style.display = 'none';
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
                // Scroll to success message
                if (formSuccess) {
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Something went wrong');
                });
            }
        })
        .catch(error => {
            // Show error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.textContent = error.message || 'Failed to send message. Please try again or email directly.';
            contactForm.insertBefore(errorDiv, contactForm.firstChild);
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.textContent = message;
            field.parentElement.appendChild(errorDiv);
            field.focus();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
