import { merge, fromEvent, interval } from 'rxjs';
 
const clicks = fromEvent(document, 'click');
const timer = interval(1000);
const clicksOrTimer = merge(clicks, timer);
clicksOrTimer.subscribe(x => console.log(x));
 
// Results in the following:
// timer will emit ascending values, one every second(1000ms) to console
// clicks logs MouseEvents to console every time the "document" is clicked
// Since the two streams are merged you see these happening
// as they occur.