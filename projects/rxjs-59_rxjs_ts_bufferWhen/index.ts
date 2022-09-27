// More info https://rxjs.dev/api/index/function/bufferWhen
// Emit an array of the last clicks every [1-5] random seconds.

import { fromEvent, bufferWhen, interval } from 'rxjs';

const clicks = fromEvent(document, 'click');
const buffered = clicks.pipe(
  bufferWhen(() => interval(1000 + Math.random() * 4000))
);
const subscription = buffered.subscribe(x => console.log(x));


// press "Stop Stream" button when you would like to stop producing values
const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  subscription.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
