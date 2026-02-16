// Testimonials.js

// Constants
const STORAGE_KEY = 'site_testimonials';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTestimonials();
});

// Handle Form Submission
function submitTestimonial(event) {
    event.preventDefault();

    // 1. Get Values
    const nameInput = document.getElementById('name');
    const feedbackInput = document.getElementById('feedback');
    const ratingInputs = document.getElementsByName('rating');
    let ratingValue = 0;

    for (const radio of ratingInputs) {
        if (radio.checked) {
            ratingValue = parseInt(radio.value);
            break;
        }
    }

    // 2. Validate
    if (!nameInput.value.trim() || !feedbackInput.value.trim()) {
        alert('Please fill in both Name and Feedback.');
        return;
    }
    if (ratingValue === 0) {
        alert('Please select a star rating.');
        return;
    }

    // 3. Create Object
    const newTestimonial = {
        id: Date.now(),
        name: nameInput.value.trim(),
        feedback: feedbackInput.value.trim(),
        rating: ratingValue,
        date: new Date().toLocaleDateString()
    };

    // 4. Save to LocalStorage
    saveTestimonial(newTestimonial);

    // 5. Update UI
    appendTestimonial(newTestimonial, true); // true = prepend to top

    // 6. Reset Form
    event.target.reset();
    alert('Thank you for your feedback!');
}

// Save to LocalStorage
function saveTestimonial(testimonial) {
    let testimonials = getStoredTestimonials();
    testimonials.unshift(testimonial); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
}

// Retrieve from LocalStorage
function getStoredTestimonials() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
}

// Load and Display
function loadTestimonials() {
    const listContainer = document.getElementById('testimonialsList');
    listContainer.innerHTML = ''; // Clear loading text

    const testimonials = getStoredTestimonials();

    if (testimonials.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: var(--muted-text);">No testimonials yet. Be the first to leave one!</p>';
        return;
    }

    testimonials.forEach(t => appendTestimonial(t, false));
}

// Create HTML Element
function appendTestimonial(data, prepend) {
    const listContainer = document.getElementById('testimonialsList');

    // Remove "No testimonials" message if it exists
    if (listContainer.querySelector('p')) {
        listContainer.innerHTML = '';
    }

    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
        <div class="testimonial-header">
            <span class="testimonial-name">${escapeHtml(data.name)}</span>
            <div class="testimonial-stars">
                ${generateStars(data.rating)}
            </div>
        </div>
        <div class="testimonial-feedback">
            "${escapeHtml(data.feedback)}"
        </div>
        <small class="testimonial-date">Posted on ${data.date}</small>
    `;

    if (prepend) {
        listContainer.prepend(card);
    } else {
        listContainer.appendChild(card);
    }
}

// Helper: Generate Star Icons
function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
