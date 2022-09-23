import './style.css';

import { Observable } from 'rxjs';

const dataSource = (observer) => {
  let condition = 1; // 1, 2
  if (condition === 1) {
    console.log(observer);
    observer.next(5);
    observer.complete();
  } else if (condition === 2) {
    observer.next(5);
    console.info(new Error('sad'));
    observer.error(new Error('sad'));
    observer.next(42);
  }
};
const stream$ = new Observable(dataSource);

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
stream$.subscribe(logObserver);
