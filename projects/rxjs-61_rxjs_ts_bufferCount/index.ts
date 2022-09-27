// More info https://rxjs.dev/api/index/function/bufferCount
// Tweening a div to move it on the screen

import { fromEvent } from 'rxjs';
import { bufferCount } from 'rxjs';

const clicks = fromEvent(document, 'click');
const buffered = clicks.pipe(bufferCount(2));
const subscription = buffered.subscribe((x) => console.log(x));

// press "Stop Stream" button when you would like to stop producing values
const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  subscription.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
