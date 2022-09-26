import { of, map } from 'rxjs';
import { ajax } from 'rxjs/ajax';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function render(post, comments): void {
  console.log({ post, comments });
}

const subscription = ajax
  .getJSON<Post[]>('https://jsonplaceholder.typicode.com/posts')
  .pipe(
    map((posts) => {
      posts.forEach((post: Post) => {
        const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
        of(
          ajax.getJSON<void>(commentsUrl).subscribe({
            next: (comments) => {
              render(post, comments);
            },
          })
        );
      });
    })
  )
  .subscribe((posts) => posts);

setTimeout(() => subscription.unsubscribe(), 1000);
