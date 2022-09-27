enum ACTION_TYPES {
  INC = 'inc',
  DEC = 'dec',
}

const initialState = {
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

decBtn.addEventListener('click', () => {
  state = reducer(state, { type: ACTION_TYPES.DEC, payload: 1 });
  counterInput.value = state.counter;
});
incBtn.addEventListener('click', () => {
  state = reducer(state, { type: ACTION_TYPES.INC, payload: 1 });
  counterInput.value = state.counter;
});
