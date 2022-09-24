import { filter, fromEvent, map, Observable } from 'rxjs';

const logObserver = {
  next: (value) => {
    // const inputElement: HTMLInputElement = res.target;
    // console.log(inputElement.value);
    console.log(value);
  },
  error: (err) => console.error(err),
  complete: () => console.log('completed'),
};

// Implement my own implementation of RxJS map function

const myMap = (fn) => (source) =>
  new Observable((observer) => {
    let subscription = source.subscribe({
      next: (v) => observer.next(fn(v)),
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    });
    return () => subscription.unsubscribe();
  });

const stream$ = fromEvent(document.getElementById('email'), 'keyup').pipe(
  // map((e) => e.target.value.trim()),
  myMap((e) => e.target.value.trim()),
  filter((email) => email !== '')
);
// console.log('start');
const subscription = stream$.subscribe(logObserver);
// console.log('end');

// Stop streams

const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  subscription.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
