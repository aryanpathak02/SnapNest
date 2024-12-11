const imageInput = document.getElementById('image-input');
const uploadBtn = document.getElementById('upload-btn');
const imagePreview = document.getElementById('image-preview');
const removeBtn = document.getElementById('remove-btn');
const numberInput = document.getElementById('numberInput');
const maxSizeInMB = 2; // Max size in MB
const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

// Fetch the form and determine if the image is required
const form = document.querySelector('form');
const isImageRequired = form && form.querySelector('input[name="imageRequired"]')?.value === 'true';

// Open the file picker when the upload button is clicked
if (uploadBtn) {
  uploadBtn.addEventListener('click', () => {
    imageInput?.click();
  });
}

// Add an event listener for the file input change
if (imageInput) {
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];

    // Check if a file is selected
    if (!file) {
      alert('No file selected.');
      return;
    }

    // Validate file size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert(`Image size must be less than ${maxSizeInMB}MB.`);
      clearInput();
      return;
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG, and JPG formats are allowed.');
      clearInput();
      return;
    }

    // Display the image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove('hidden'); // Show the preview
      removeBtn?.classList.remove('hidden');   // Show the remove button
    };
    reader.readAsDataURL(file);
  });
}

// Remove image functionality
if (removeBtn) {
  removeBtn.addEventListener('click', () => {
    clearInput();
  });
}

// Form submission logic
if (form) {
  form.addEventListener('submit', (e) => {
    // Ensure image is uploaded if required
    if (isImageRequired && (!imageInput.files || !imageInput.files[0])) {
      e.preventDefault(); // Prevent form submission
      alert('Image is required!');
      return;
    }

    // Ensure valid number input
    if (numberInput && (numberInput.value === '' || numberInput.value.length > 10)) {
      e.preventDefault();
      alert('Please enter a valid number with a maximum of 10 digits.');
    }
  });
}

// Helper function to clear the input and preview
function clearInput() {
  if (imageInput) imageInput.value = ''; // Clear the input field
  if (imagePreview) {
    imagePreview.src = ''; // Clear the preview image
    imagePreview.classList.add('hidden'); // Hide the preview
  }
  removeBtn?.classList.add('hidden'); // Hide the remove button
}

// Input sanitization for number field
if (numberInput) {
  numberInput.addEventListener('input', () => {
    // Remove non-numeric characters
    numberInput.value = numberInput.value.replace(/\D/g, '');
  });
}
