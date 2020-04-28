import {
    ACTION_SET_CURRENT_WORD,
    ACTION_SET_WORD_INFO
} from './Types';

const initialState = {
    currentWord: 'hello',
    wordInfo: {}
};

const rootReduser = (state = initialState, action) => { 
    switch(action.type) {
        case ACTION_SET_CURRENT_WORD:
            return {...state, currentWord: action.payload};
        
        case ACTION_SET_WORD_INFO:
            return {...state, wordInfo: action.payload};
    }

    return state;
};

export default rootReduser;