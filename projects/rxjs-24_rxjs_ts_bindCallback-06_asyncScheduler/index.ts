import { asyncScheduler, bindCallback } from 'rxjs';

function authenticate(username, password, callback) {
  if (username === 'john' && password === '123') {
    callback('authenticated', 'admin');
  } else {
    throw new Error(
      `Invalid Credentials. user name = ${username}, password = ${password}`
    );
  }
}

function selector(result, authorization) {
  return { result, authorization };
}
const getAuthenticationObservable = bindCallback(
  authenticate,
  selector,
  asyncScheduler
);
const authenticationResults = getAuthenticationObservable('john', '123');

const subscription = authenticationResults.subscribe(
  ({ result, authorization }) => {
    const authenticated = result === 'authenticated';
    console.log(`Authenticated: ${authenticated ? 'yes' : 'no'}`);
    if (authenticated) {
      console.log(`Authentication Level: ${authorization}`);
    }
  }
);

setTimeout(() => {
  subscription.unsubscribe();
}, 3000);

console.log('Hey!!');
