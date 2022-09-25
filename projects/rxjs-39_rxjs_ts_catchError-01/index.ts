import { catchError, Observable, of } from 'rxjs';

const erroredStream$ = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.error('out of boundries');
});

const erroredStreamSubscriber = erroredStream$
  .pipe(
    catchError((err) => {
      // err === 'out of boundries'
      // тут erroredStream$ завершился c ошибкой и больше не будет выдавать значения
      // но мы можем отдать замещающий поток
      console.error(err);
      return of(4, 5, 6);
    })
  )
  .subscribe({
    next: (value) => console.log('value', value),
    error: (err) => console.error('err', err),
  });

erroredStreamSubscriber.unsubscribe();
