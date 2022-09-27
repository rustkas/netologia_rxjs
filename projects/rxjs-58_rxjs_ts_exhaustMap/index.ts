// More info https://rxjs.dev/api/index/function/exhaustMap
// Run a finite timer for each click, only if there is no currently active timer.

import { fromEvent, exhaustMap, interval, take } from 'rxjs';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(exhaustMap(() => interval(1000).pipe(take(5))));
const subscription = result.subscribe((x) => console.log(x));

// press "Stop Stream" button when you would like to stop producing values
const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  subscription.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
