import {} from 'rxjs';
import {ajax} from 'rxjs/ajax';

const logObserver = {
  next: (value) => {
    console.log(value);
  },
  error: (err) => console.error(err),
  complete: () => console.log('completed'),
};

ajax.getJSON('https://jsonplaceholder.typicode.com/posts')
.subscribe(logObserver);
