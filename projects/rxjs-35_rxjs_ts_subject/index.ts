import {
  debounceTime,
  filter,
  fromEvent,
  map,
  distinctUntilChanged,
  of,
  Observable,
  Subject,
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

const subject = new Subject();
subject.subscribe(logObserver);
subject.next('hello');
subject.subscribe(logObserver);
subject.next('world');
subject.error('space');
// Stop streams
subject.unsubscribe();

const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  stop_stream_subscription.unsubscribe();
});
