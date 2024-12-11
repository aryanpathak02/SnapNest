// Function to make an Axios POST request
function sendPostRequest(url, postId) {
    return axios.post(`${url}/${postId}`);
}

// Function to handle saving a post
function savePost(postId, btn) {
    sendPostRequest('http://localhost:8080/savedPost', postId)
        .then(response => {
            console.log('Post save response:', response.data);

            // Use the server response to update the button state
            const { isSaved } = response.data;
            btn.setAttribute('fill', isSaved ? '#000000' : 'none');
        })
        .catch(error => {
            console.error('Error saving the post:', error);
        });
}

// Function to handle liking a post
function likePost(postId, btn) {
    sendPostRequest('http://localhost:8080/like', postId)
        .then(response => {
            console.log('Post like response:', response.data);

            // Use the server response to update the button state
            const { isLiked } = response.data;
            btn.setAttribute('fill', isLiked ? '#e00b0b' : 'none');
        })
        .catch(error => {
            console.error('Error liking the post:', error);
        });
}

// Function to attach event listeners to buttons
function attachEventListeners() {
    const savedPostBtns = document.querySelectorAll('.savedPostBtn');
    const likeBtns = document.querySelectorAll('.likeButton');

    // Attach event listeners for saving posts
    savedPostBtns.forEach(btn => {
        if (!btn.dataset.listenerAttached) { // Avoid duplicate listeners
            btn.addEventListener('click', () => {
                const postId = btn.getAttribute('postid');
                savePost(postId, btn);
            });
            btn.dataset.listenerAttached = true;
        }
    });

    // Attach event listeners for liking posts
    likeBtns.forEach(btn => {
        if (!btn.dataset.listenerAttached) { // Avoid duplicate listeners
            btn.addEventListener('click', () => {
                const postId = btn.getAttribute('postid');
                likePost(postId, btn);
            });
            btn.dataset.listenerAttached = true;
        }
    });
}

// Initialize event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', attachEventListeners);
