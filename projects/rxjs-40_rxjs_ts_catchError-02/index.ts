import {
  catchError,
  fromEvent,
  Observable,
  of,
  throwError,
  switchMap,
map,
} from 'rxjs';

const inputEl = document.getElementById('email');
fromEvent(inputEl, 'input').pipe(
  switchMap((event) =>
    createObservableRequest(event.target.value).pipe(
      map((value) => {
        console.log(value);
        value;
      }),
      catchError((err) => {
        if (err.status > 500) {
          console.log(err);
          console.log(500);
          return throwError(() => new Error('internal server error'));
        }
        if (err.status > 400) {
          console.log(400);
          return throwError(() => new Error('invalid request'));
        }
        console.log(null);
        return of(null);
      })
    )
  )
);

function createObservableRequest(value: any) {
  return new Observable((value) => value);
}
