// More info https://rxjs.dev/api/index/function/switchAll
// Restart an interval Observable on every click event

import { fromEvent, tap, map, interval, switchAll } from 'rxjs';

const clicks = fromEvent(document, 'click').pipe(tap(() => console.log('click')));
const source = clicks.pipe(map(() => interval(1000)));

const subscription = source
  .pipe(switchAll())
  .subscribe(x => console.log(x));

// Output
// click
// 0
// 1
// 2
// 3
// ...
// click
// 0
// 1
// 2
// ...
// click
// ...


// press "Stop Stream" button when you would like to stop producing values
const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  subscription.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
