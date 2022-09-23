// Compare behaviour with and without async Scheduler

import { asyncScheduler, bindCallback } from 'rxjs';

function fetchResults(url, callback) {
	let response = fetch(url);
	response
		.then(r => r.json())
		.then(d => callback(d));	
}

let getResultsObservable = bindCallback(fetchResults);
let results = getResultsObservable('https://jsonplaceholder.typicode.com/todos');

// results.subscribe({
//   next: d => console.log(d), 
//   error: e => console.error(e), 
//   complete: () => console.log('Completed!!')
// });

function authenticate(username, password, callback){
	if(username === 'john' && password === '123') {
		callback('authenticated', 'admin');
	} else {
		throw new Error('Invalid Credentials');
	}
}

function selector(result, authorization) {
	return {result, authorization};
}
let getAuthenticationObservable = bindCallback(authenticate, selector, asyncScheduler);
let authenticationResults = getAuthenticationObservable('john', '123');

authenticationResults.subscribe(({result, authorization}) => {
	let authenticated = result === 'authenticated';
	console.log(`Authenticated: ${authenticated ? 'yes': 'no'}`);
	if(authenticated) {
		console.log(`Authentication Level: ${authorization}`);
	}
});

console.log('Hey!!');
