import { Observable } from 'rxjs';

const dataSource = (observer) => {
  observer.next(5);
  observer.next('world');
  // fetch('https://jsonplaceholder.typicode.com/')
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.json())
    .then((data) => {
      observer.next(data);
      observer.complete();
    })
    .catch((err) => observer.error(err));
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
stream$.subscribe(logObserver);
console.log('end');