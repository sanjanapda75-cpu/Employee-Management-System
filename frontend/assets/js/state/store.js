// Global app state
let state = {
  editingId: null,   // which employee is being edited
  employee: []       // list of all employees
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}