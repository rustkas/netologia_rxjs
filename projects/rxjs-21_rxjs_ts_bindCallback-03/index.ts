// Compare behaviour with and without async Scheduler

import { asyncScheduler, bindCallback } from 'rxjs';

function iCallMyCallbackSynchronously(cb) {
  cb();
}

const boundSyncFn = bindCallback(iCallMyCallbackSynchronously);
const boundAsyncFn = bindCallback(
  iCallMyCallbackSynchronously,
  null,
  asyncScheduler
);

boundSyncFn().subscribe(() => console.log('I was sync!'));
boundAsyncFn().subscribe(() => console.log('I was async!'));
console.log('This happened...');

// Logs:
// I was sync!
// This happened...
// I was async!
