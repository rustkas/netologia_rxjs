import { fromEvent, Observer } from 'rxjs';

const logObserver:Observer<KeyboardEvent> = {
  next: (res) => {
    console.log(res.target.value);
  },
  error: (err) => console.error(err),
  complete: () => console.log('completed'),
};

const stream$ = fromEvent(document.getElementById('email'), 'keyup');
// console.log('start');
const subscription = stream$.subscribe(logObserver);
// console.log('end');


// Stop streams

const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe(_element => {
  subscription.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
