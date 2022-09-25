fetch('https://jsonplaceholder.typicode.com/posts')
  .then((r) => r.json())
  .then((posts) =>
    Promise.all(
      posts.map((post) => {
        const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`\;
        return fetch(commentsUrl)
          .then((r) => r.json())
          .then((comments) => ({
            ...post,
            comments,
          }));
      })
    )
  )
  .then(console.log);
