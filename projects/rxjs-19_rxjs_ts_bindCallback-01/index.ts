import './style.css';
import { bindCallback } from 'rxjs';

import * as jQuery from 'jquery';

const getJSONAsObservable = bindCallback(jQuery.getJSON);
const stream$ = getJSONAsObservable('https://jsonplaceholder.typicode.com/posts');
const subscription = stream$.subscribe({
  next: x => {
    console.log(x);
    subscription.unsubscribe();
  },
  error: e => console.error(e)
});
