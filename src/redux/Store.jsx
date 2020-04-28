import {createStore} from 'redux';
import rootReduser from './Reduser';

const store = createStore(rootReduser);

export default store;