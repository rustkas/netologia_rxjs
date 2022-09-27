import { of, map, catchError } from 'rxjs';

of(1, 2, 3, 4, 5)
  .pipe(
    map((n) => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError((err) => {
      console.error(err);
      return of('I', 'II', 'III', 'IV', 'V');
    })
  )
  .subscribe((x) => console.log(x));
// 1, 2, 3, I, II, III, IV, V
