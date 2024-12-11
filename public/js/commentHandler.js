// js for comment sections 
const commentButtons = document.querySelectorAll('.comment-btn');

commentButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Get the data-id from the clicked SVG or its parent
        const postId = button.getAttribute('data-id');

        // Find the corresponding comment section
        const commentDiv = document.getElementById(`comment-${postId}`);

        // Toggle visibility
        if (commentDiv.classList.contains('hidden')) {
            commentDiv.classList.remove('hidden');
        } else {
            commentDiv.classList.add('hidden');
        }
    });
});
