async function getUserContent() {
    const resultsp = document.getElementById("results");

    const urlparams = new URLSearchParams(window.location.search);
    const username = urlparams.get("u");
    const query = urlparams.get("q");

    // Clear previous content
    resultsp.innerHTML = '';

    try {
        // Fetch the user's posts
        const postResponse = await fetch(`https://www.reddit.com/user/${username}/submitted/.json`);
        const postData = await postResponse.json();

        const postsContainer = document.getElementById('posts');
        postData.data.children.forEach(post => {
            const postInfo = post.data;
            if (postInfo.selftext.includes(query)) {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <a href="https://www.reddit.com${postInfo.permalink}" target="_blank">${postInfo.selftext}</a>
                `;
                resultsp.appendChild(postElement);
            }
        });

        // Fetch the user's comments
        const commentResponse = await fetch(`https://www.reddit.com/user/${username}/comments/.json`);
        const commentData = await commentResponse.json();

        const commentsContainer = document.getElementById('comments');
        commentData.data.children.forEach(comment => {
            const commentInfo = comment.data;
            if (commentInfo.body.includes(query)) {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `
                    <a href="https://www.reddit.com${commentInfo.permalink}" target="_blank">${commentInfo.body}</a>
                `;
                resultsp.appendChild(commentElement);
            } else {
                console.warn(commentInfo.body)
            }
        });

    } catch (error) {
        console.error('Error fetching user content:', error);
        alert("The user doesn't exist!")
    }
}