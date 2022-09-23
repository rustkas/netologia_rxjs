// Receive a list of arguments passed to a callback

import { bindCallback, Observable } from 'rxjs';

const someFunction = (a, b, c) => {
  console.log(a); // 5
  console.log(b); // 'some string'
  console.log(c); // {someProperty: 'someValue'}
};

const boundSomeFunction: (
  a: any,
  b: any,
  c: any
) => Observable<readonly unknown[]> = bindCallback(someFunction);
const stream$ = boundSomeFunction(5, 'some string', {
  someProperty: 'someValue',
});
const subscription = stream$.subscribe((values) => {
  console.log(values); // [5, 'some string', {someProperty: 'someValue'}]
});
subscription.unsubscribe();
