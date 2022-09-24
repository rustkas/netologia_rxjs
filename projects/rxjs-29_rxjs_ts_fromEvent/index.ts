import { fromEvent, map } from 'rxjs';

const logObserver = {
  next: (value) => {
    // const inputElement: HTMLInputElement = res.target;
    // console.log(inputElement.value);
    console.log(value);
  },
  error: (err) => console.error(err),
  complete: () => console.log('completed'),
};

const stream$ = fromEvent(document.getElementById('email'), 'keyup').pipe(
  map((e) =>  e.target.value) 
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
