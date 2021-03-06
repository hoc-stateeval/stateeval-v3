import { clearTokens } from './tokenService';

const KEY = 'redux';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

export const clearState = () => {
  localStorage.setItem(KEY, null);
  localStorage.setItem('persist:root', null);
  clearTokens();
}