// Use map operator to dynamically calculate the Body-Mass Index

import { of, combineLatest, map } from 'rxjs';

const weight = of(70, 72, 76, 79, 75);
const height = of(1.76, 1.77, 1.78, 1.77);
const bmi = combineLatest([weight, height]).pipe(map(([w, h]) => w / (h * h)));
bmi.subscribe((x) => console.log('BMI is ' + x));

// With output to console:
// BMI is 24.212293388429753
// BMI is 23.93948099205209
// BMI is 23.671253629592222
// BMI is 23.93948099205209
