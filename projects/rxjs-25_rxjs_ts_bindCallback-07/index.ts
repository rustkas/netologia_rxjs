import { asyncScheduler, bindCallback } from 'rxjs';

const someFunction = (x, y, callback) => {
  callback(x, y);
};

const boundSomeFunction = bindCallback(someFunction);
const subscription = boundSomeFunction('my name', 'my age').subscribe((data) =>
  console.log(`data is "${data}"`)
);

setTimeout(() => {
  subscription.unsubscribe();
}, 3000);
