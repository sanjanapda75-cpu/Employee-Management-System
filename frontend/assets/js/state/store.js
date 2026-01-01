// Global app state
let state = {
  editingId: null,   // which employee is being edited
  employee: [],
  payroll: []
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}