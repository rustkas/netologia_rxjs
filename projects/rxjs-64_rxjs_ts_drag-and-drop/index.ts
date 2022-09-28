import { fromEvent } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';

const draggable = (el) => {
  const startDrag$ = fromEvent(el, 'mousedown');
  const moveDrag$ = fromEvent(document, 'mousemove');
  const endDrag$ = fromEvent(el, 'mouseup');
  return startDrag$.pipe(
    switchMap((event: PointerEvent) => {
      event.stopPropagation();
      const diffX = el.offsetLeft - event.clientX;
      const diffY = el.offsetTop - event.clientY;
      return moveDrag$.pipe(
        map((event: PointerEvent) => {
          const { clientX, clientY } = event;
          return {
            x: clientX + diffX,
            y: clientY + diffY,
          };
        }),
        takeUntil(endDrag$)
      );
    })
  );
};

const draggableEl = document.getElementById('square');
draggable(draggableEl).subscribe((coord) => {
  draggableEl.style.top = `${coord.y}px`;
  draggableEl.style.left = `${coord.x}px`;
});
