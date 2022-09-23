import './style.css';
import { Observable } from 'rxjs';

const fromEvent = (el, eventName) => {
  return new Observable(observer => {
    const handler = e => observer.next(e.target.value);
    el.addEventListener(eventName, handler);
    return () => {
      el.removeEventListener(eventName, handler);
    }
  })
};

const stream$ = fromEvent(document.getElementById('email'), 'input');
const logObserver = {
  next(v) {
    console.log(v);
  },
  error(err) {
    console.error(err);
  },
  complete() {
    console.log('complete');
  }
};

console.log('start');
const subscription = stream$.subscribe(logObserver);
console.log('end');