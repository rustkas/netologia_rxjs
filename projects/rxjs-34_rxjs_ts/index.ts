import {
  debounceTime,
  filter,
  fromEvent,
  map,
  distinctUntilChanged,
  of,
Observable,
} from 'rxjs';

const logObserver = {
  next: (value) => {
    // const inputElement: HTMLInputElement = res.target;
    // console.log(inputElement.value);
    console.log(value);
  },
  error: (err) => console.error(err),
  complete: () => console.log('completed'),
};

const stream$ = new Observable(observer => {
  setTimeout(() => observer.next(Math.random()), 100);
  setTimeout(() => observer.next(Math.random()), 200);
  setTimeout(() => observer.next(Math.random()), 300);
  });

// console.log('start');
const subscription1 = stream$.subscribe(logObserver);
const subscription2 = stream$.subscribe(logObserver);
// console.log('end');

// Stop streams

const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  subscription1.unsubscribe();
  subscription2.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
