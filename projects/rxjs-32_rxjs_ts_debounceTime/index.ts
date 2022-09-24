import { debounceTime, filter, fromEvent, map, ObservableInput, of } from 'rxjs';

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

const stream$ = fromEvent(document.getElementById('email'), 'keyup').pipe(
  debounceTime(200),
  map(e => e?.target?.value),
  // pluck('target', 'value'),
  map((email) => email.trim()),
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
