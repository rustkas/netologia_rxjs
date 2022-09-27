// More info https://rxjs.dev/api/index/function/animationFrames
// Tweening a div to move it on the screen

import { fromEvent } from 'rxjs';
import { animationFrames, map, takeWhile, endWith } from 'rxjs';

function tween(start: number, end: number, duration: number) {
  const diff = end - start;
  return animationFrames().pipe(
    // Figure out what percentage of time has passed
    map(({ elapsed }) => elapsed / duration),
    // Take the vector while less than 100%
    takeWhile((v) => v < 1),
    // Finish with 100%
    endWith(1),
    // Calculate the distance traveled between start and end
    map((v) => v * diff + start)
  );
}

// Setup a div for us to move around
const div = document.createElement('div');
document.body.appendChild(div);
div.style.position = 'absolute';
div.style.width = '40px';
div.style.height = '40px';
div.style.backgroundColor = 'lime';
div.style.transform = 'translate3d(10px, 0, 0)';

const subscription = tween(10, 240, 4000).subscribe((x) => {
  div.style.transform = `translate3d(${x}px, 10px, 0)`;
});

// press "Stop Stream" button when you would like to stop producing values
const stop_stream$ = fromEvent(document.getElementById('stop_stream'), 'click');
const stop_stream_subscription = stop_stream$.subscribe((_element) => {
  subscription.unsubscribe();
  stop_stream_subscription.unsubscribe();
});
