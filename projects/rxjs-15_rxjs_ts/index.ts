import { Observable } from 'rxjs';

const logObserver = {
  next(v) {
    console.log(v);
  },
  error(err) {
    console.error(err);
  },
  complete() {
    console.log('complete');
  },
};

const timer = (dueTime, intervalTime) =>
  new Observable((observer) => {
    let i = 0;
    const timeout = setTimeout(() => {
      observer.next(i++);
      setInterval(() => {
        observer.next(i++);
      }, intervalTime);
    }, dueTime);

    return () => {
      clearTimeout(timeout);
    };
  });
const stream = timer(0, 1000);
console.log('start');
const subscription = stream.subscribe(logObserver);
console.log('end');
