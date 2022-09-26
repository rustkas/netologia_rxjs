import { map, switchMap, ObservableInput, Observable } from 'rxjs';
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
    switchMap<Post[], ObservableInput<Object>>((posts) => {
      return posts.map((post: Post) => {
        const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
        const jsonItem = ajax.getJSON(commentsUrl);
        return jsonItem.pipe(
          map((comments) => {
            return {
              ...post,
              comments,
            };
          })
        );
      });
    })
  )
  .subscribe((observablePost: Observable<Object>) => {
    // console.log(item);
    observablePost.subscribe((item) => {
      console.log(item);
    });
  });

setTimeout(() => subscription.unsubscribe(), 1000);
