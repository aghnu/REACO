import { createStore } from 'jotai';
import * as systemState from './systemState';
import * as displayState from './displayState';
import * as applicationState from './applicationState';

const defaultStore = createStore();

export default defaultStore;
export { systemState, displayState, applicationState };
