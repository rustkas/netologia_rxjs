// Compare behaviour with and without async Scheduler

import { asyncScheduler, bindCallback } from 'rxjs';

function fetchResults(url, callback) {
	let response = fetch(url);
	response
		.then(r => r.json())
		.then(d => callback(d));	
}

const getResultsObservable = bindCallback(fetchResults);
const results = getResultsObservable('https://jsonplaceholder.typicode.com/todos');

const subscription = constresults.subscribe({
	next: d => console.log(d), 
	error: e => console.error(e), 
	complete: () => console.log('Completed!!')
});

setTimeout(() => {
  subscription.unsubscribe();
}, 3000);