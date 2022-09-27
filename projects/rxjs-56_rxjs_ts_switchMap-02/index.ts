// More info https://rxjs.dev/api/index/function/switchMap
// Restart an interval Observable on every click event

import { fromEvent, switchMap, interval } from 'rxjs';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(switchMap(() => interval(1000)));
const subscription = result.subscribe((x) => console.log(x));

// press "Stop Stream" button when you would like to stop producing values
const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  subscription.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
