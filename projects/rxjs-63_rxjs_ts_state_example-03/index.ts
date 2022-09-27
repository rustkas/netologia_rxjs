import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';

enum ACTION_TYPES {
  INC = 'inc',
  DEC = 'dec',
}
interface State {
  counter: number;
}
const initialState: State = {
  counter: 0,
};

const sample = {
  type: ACTION_TYPES.INC,
  payload: 5,
};

function reducer(oldState, action) {
  if (action === null) {
    return oldState;
  }
  switch (action.type) {
    case ACTION_TYPES.INC: {
      return { counter: oldState.counter + action.payload };
    }
    case ACTION_TYPES.DEC: {
      return { counter: oldState.counter - action.payload };
    }
    default:
      return oldState;
  }
}

const incBtn = document.getElementById('inc');
const decBtn = document.getElementById('dec');
const counterInput: HTMLInputElement = document.getElementById(
  'counter'
) as HTMLInputElement;

let state = reducer(initialState, null);

class Store {
  state;
  state$: Subject<State>;
  constructor(state) {
    this.state = state;
    this.state$ = new Subject();
  }
  inc() {
    this.state = reducer(this.state, { type: ACTION_TYPES.INC, payload: 1 });
    this.state$.next(this.state);
  }
  dec() {
    this.state = reducer(this.state, { type: ACTION_TYPES.DEC, payload: 1 });
    this.state$.next(this.state);
  }
}

const store = new Store(initialState);

decBtn.addEventListener('click', () => {
  store.dec();
});
incBtn.addEventListener('click', () => {
  store.inc();
});

store.state$
  .pipe(
    debounceTime(500),
    map(({ counter }) => counter),
    distinctUntilChanged()
  )
  .subscribe({
    next: (counter) => {
      counterInput.value = String(counter);
    },
  });
