import { createStore } from 'jotai';
import * as systemState from './systemState';
import * as displayState from './displayState';

const defaultStore = createStore();

export default defaultStore;
export { systemState, displayState };
