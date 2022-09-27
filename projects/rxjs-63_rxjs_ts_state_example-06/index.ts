import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  scan,
  shareReplay,
  Subject,
} from 'rxjs';

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
  state$: Subject<State>;
  actions$;
  constructor(state) {
    this.actions$ = new Subject();
    this.state$ = this.actions$.pipe(
      scan((oldState, action) => reducer(oldState, action), state),
      shareReplay()
    );
  }
  inc() {
    this.actions$.next({ type: ACTION_TYPES.INC, payload: 1 });
  }
  dec() {
    this.actions$.next({ type: ACTION_TYPES.DEC, payload: 1 });
  }
}

const store = new Store(initialState);

// Merge two events
merge(
  fromEvent(decBtn, 'click').pipe(map(() => ACTION_TYPES.DEC)),
  fromEvent(incBtn, 'click').pipe(map(() => ACTION_TYPES.INC))
).subscribe({
  next: (operation) => store[operation](),
});

store.state$
  .pipe(
    // debounceTime(500),
    map(({ counter }) => counter),
    distinctUntilChanged()
  )
  .subscribe({
    next: (counter) => {
      counterInput.value = String(counter);
    },
  });

store.state$.subscribe();
