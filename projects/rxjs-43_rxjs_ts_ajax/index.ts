import { ajax } from 'rxjs/ajax';

function render(post, comments) {
  console.log({ post, comments });
}

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

const logObserver = {
  next: (value) => {
    console.log(value);
  },
  error: (err) => console.error(err),
  complete: () => console.log('completed'),
};

const subscription = ajax
  .getJSON<Object[]>('https://jsonplaceholder.typicode.com/posts')
  .subscribe({
    next: (posts:Post[]) => {
      posts.forEach((post) => {
        // console.log(post.id);
        const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
        console.log(commentsUrl);
        ajax.getJSON(commentsUrl).subscribe({
          next: (comments) => {
            render(post, comments);
          },
        });
      });
    },
  });

  setTimeout(()=>{
    subscription.unsubscribe();
  },3000);

