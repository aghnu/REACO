import { createStore } from 'jotai';
import * as systemState from './systemState';
import * as displayState from './displayState';
import * as applicationState from './applicationState';
import * as globalStyleState from './globalStyleState';

const defaultStore = createStore();

export default defaultStore;
export { systemState, displayState, applicationState, globalStyleState };
