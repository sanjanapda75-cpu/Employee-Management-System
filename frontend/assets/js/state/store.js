// Global app state
let state = {
  editingId: null,   // which employee is being edited
  employee: [],
  payroll: [],
  project: [],
};

export function setState(newState) {
  state = { ...state, ...newState };
}

export function getState() {
  return state;
}