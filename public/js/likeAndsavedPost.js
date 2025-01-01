// Function to make an Axios POST request
function sendPostRequest(url, postId) {
    return axios.post(`${url}/${postId}`);
}

// Function to handle saving a post
function savePost(postId, btn) {
    // Update DOM immediately to reflect the change
    const originalColor = btn.getAttribute('fill');
    btn.setAttribute('fill', '#000000'); 
<<<<<<< HEAD
    sendPostRequest('http://localhost:8080/savedPost', postId)
=======
    sendPostRequest('https://snapnest-u9zi.onrender.com/savedPost', postId)
>>>>>>> 03461dd4722c8f47dd2999f6fdb1aee9486b1369
        .then(response => {
            console.log('Post save response:', response.data);
            const { isSaved } = response.data;
            btn.setAttribute('fill', isSaved ? '#fff' : 'none');
        })
        .catch(error => {
            console.error('Error saving the post:', error);
            alert('Saving the post failed. Please try again.');

            // Revert the DOM update if error occurs
            btn.setAttribute('fill', originalColor);
        });
}

// Function to handle liking a post
// function likePost(postId, btn) {
//     // Update DOM immediately to reflect the change
//     const originalColor = btn.getAttribute('fill');
//     btn.setAttribute('fill', '#e00b0b'); 

//     sendPostRequest('http://localhost:8080/like', postId)
//         .then(response => {
//             console.log('Post like response:', response.data);
//             const { isLiked } = response.data;
//             btn.setAttribute('fill', isLiked ? '#e00b0b' : 'none');
//         })
//         .catch(error => {
//             console.error('Error liking the post:', error);
//             alert('Liking the post failed. Please try again.');

            
//             btn.setAttribute('fill', originalColor);
//         });
// }
function likePost(postId, btn) {
    // Update DOM immediately to reflect the change
<<<<<<< HEAD
    const pathElement = btn.querySelector('path');
    const originalFill = pathElement.getAttribute('fill');
    const originalStroke = pathElement.getAttribute('stroke');

    // Temporarily set it to indicate the user action
    pathElement.setAttribute('fill', '#e00b0b');
    pathElement.setAttribute('stroke', 'none');

    sendPostRequest('http://localhost:8080/like', postId)
=======
    const originalColor = btn.getAttribute('fill');
    btn.setAttribute('fill', '#e00b0b'); 

    sendPostRequest('https://snapnest-u9zi.onrender.com/like', postId)
>>>>>>> 03461dd4722c8f47dd2999f6fdb1aee9486b1369
        .then(response => {
            console.log('Post like response:', response.data);
            const { isLiked } = response.data;

            // Update the fill and stroke based on the response
            pathElement.setAttribute('fill', isLiked ? '#e00b0b' : 'none');
            pathElement.setAttribute('stroke', isLiked ? 'none' : '#fff');
        })
        .catch(error => {
            console.error('Error liking the post:', error);
            alert('Liking the post failed. Please try again.');

<<<<<<< HEAD
            // Revert to the original state in case of an error
            pathElement.setAttribute('fill', originalFill);
            pathElement.setAttribute('stroke', originalStroke);
=======
            
            btn.setAttribute('fill', originalColor);
>>>>>>> 03461dd4722c8f47dd2999f6fdb1aee9486b1369
        });
}


// Function to attach event listeners to buttons
function attachEventListeners() {
    const savedPostBtns = document.querySelectorAll('.savedPostBtn');
    const likeBtns = document.querySelectorAll('.likeButton');

    // Attach event listeners for saving posts
    savedPostBtns.forEach(btn => {
        if (!btn.dataset.listenerAttached) { 
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