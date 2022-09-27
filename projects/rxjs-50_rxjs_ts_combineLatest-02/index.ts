// Combine a dictionary of Observables
import { of, delay, startWith, combineLatest } from 'rxjs';
 
const observables = {
  a: of(1).pipe(delay(1000), startWith(0)),
  b: of(5).pipe(delay(5000), startWith(0)),
  c: of(10).pipe(delay(10000), startWith(0))
};
const combined = combineLatest(observables);
combined.subscribe(value => console.log(value));
// Logs
// { a: 0, b: 0, c: 0 } immediately
// { a: 1, b: 0, c: 0 } after 1s
// { a: 1, b: 5, c: 0 } after 5s
// { a: 1, b: 5, c: 10 } after 10s