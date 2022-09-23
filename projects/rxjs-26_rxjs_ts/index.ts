import { from, of, range } from 'rxjs';

from([1, 2, 3])
  .subscribe((v) => console.log(v))
  .unsubscribe();

of(1, 2, 3)
  .subscribe((v) => console.log(v))
  .unsubscribe();

of([1, 2, 3])
  .subscribe((v) => console.log(v))
  .unsubscribe();
  
range(1, 3)
  .subscribe((v) => console.log(v))
  .unsubscribe();
