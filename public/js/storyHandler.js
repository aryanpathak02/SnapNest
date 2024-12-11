
const storySection = document.getElementById('storySection');
const postSection = document.getElementById('postSection');
const crossBtn = document.getElementById('crossBtn');
const storys = document.querySelectorAll('.storys');

crossBtn.addEventListener('click', () => {
    storySection.classList.add('hidden');
    postSection.classList.remove('hidden');
});
storys.forEach(story => {
    story.addEventListener('click', () => {
        // Get data from the clicked story
        const userStoryImage = story.querySelector('#userStory').src;
        const userImage = story.querySelector('#userimage').src;
        const username = story.querySelector('#username').textContent;
        const createdAt = story.querySelector('#time').textContent;

        // Update the storySection content
        storySection.style.backgroundImage = `url(${userImage})`; // Set background image
        storySection.querySelector('#userimage').src = userStoryImage; // User profile image
        storySection.querySelector('#userName').textContent = username; // Username
        storySection.querySelector('#postTime').textContent = createdAt ; // Post time

        storySection.classList.remove('hidden');
        postSection.classList.add('hidden');
    });
});