import './style.css';
import { from } from 'rxjs';

const json = fetch('https://jsonplaceholder.typicode.com/posts').then((r) =>
  r.json()
);
const subscription = from(json).subscribe((result) => console.log(result));
setTimeout(() => {
  subscription.unsubscribe();
}, 3000);
