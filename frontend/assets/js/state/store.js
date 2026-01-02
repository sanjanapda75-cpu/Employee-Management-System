// Global app state
let state = {
  editingId: null,   
  employee: [],
  payroll: [],        // ADDED: For payroll records
  project: []        
};

export function setState(newState) {
  state = { ...state, ...newState };
}

export function getState() {
  return state;
}