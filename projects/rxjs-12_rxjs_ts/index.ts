import './style.css';

import { Observable } from 'rxjs';

const debounce = (delay) => (fn) => {
  let timeoutId;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fn();
  }, delay);
  return () => {
    clearTimeout(timeoutId)
  }
};

const dataSource = (observer) => {
  observer.next(5);
  observer.next('world');

  const debouncer = debounce(5000);
  const cancel = debouncer(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.json())
      .then((data) => {
        observer.next(data);
        observer.complete();
      })
      .catch((err) => observer.error(err));
  });
};
const stream$ = new Observable(dataSource);

// it is complete observer
const logObserver = {
  next(v) {
    console.log(v);
  },
  error(err) {
    console.error(err);
  },
  complete() {
    console.log('completed');
  },
};
// console.log(logObserver);
console.log('start');
const subscription = stream$.subscribe(logObserver);
console.log('end');

debounce(3000)(() => subscription.unsubscribe());