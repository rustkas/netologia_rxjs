import { Observable, Subject, throwError } from 'rxjs';

const logObserver = {
  next: (value) => {
    console.log(value);
  },
  error: (err) => console.error(err),
  complete: () => console.log('completed'),
};

const streamWithRandom$ = new Observable((observer) =>
   observer.next(Math.random())
);

const subject = new Subject();
subject.subscribe(logObserver);
subject.subscribe(logObserver);

const streamWithRandomSubscription = streamWithRandom$.subscribe(subject);

// Stop streams
subject.unsubscribe();
streamWithRandomSubscription.unsubscribe();
