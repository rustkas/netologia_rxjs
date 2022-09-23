import './style.css';
import { interval } from 'rxjs';

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

const stream$ = interval(1000);
console.log('start');
const subscription = stream$.subscribe(logObserver);
console.log('end');
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
