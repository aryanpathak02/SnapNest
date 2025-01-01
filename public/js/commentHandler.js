// js for comment sections 
const commentButtons = document.querySelectorAll('.comment-btn');
const saveCommentButtons = document.querySelectorAll(".saveCommentButton");

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


saveCommentButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        // Disable the clicked button
        button.disabled = true;
        const form = button.closest('form');
        // Replace the SVG with the loading spinner
        button.innerHTML = `
            <svg class="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="40" cy="65">
                    <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
                </circle>
                <circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="100" cy="65">
                    <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
                </circle>
                <circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="160" cy="65">
                    <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
                </circle>
            </svg>
        `;

        form.submit();
    });
});
