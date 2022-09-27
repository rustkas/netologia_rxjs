// More info https://rxjs.dev/api/index/function/switchMap
// Generate new Observable according to source Observable values

import { of, switchMap } from 'rxjs';

const switched = of(1, 2, 3).pipe(
  switchMap((x) => {
    console.info(`Current value is ${x}`);
    return of(x, x ** 2, x ** 3);
  })
);
switched.subscribe((x) => console.log(x));
// outputs
// 1
// 1
// 1
// 2
// 4
// 8
// 3
// 9
// 27
