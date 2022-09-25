import { Observable, Subject, throwError } from 'rxjs';

const errorStream$ = new Observable((observer) => {
  observer.next(Math.random());
  observer.error(new Error('sad'));
});
const errorStreamSubscription = errorStream$.subscribe({
  next: null,
  error: (err) => console.log(`This is the error "${err}"`),
});

errorStreamSubscription.unsubscribe();
