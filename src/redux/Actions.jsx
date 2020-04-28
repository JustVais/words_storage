import {
    ACTION_SET_CURRENT_WORD,
    ACTION_SET_WORD_INFO
} from './Types';

const setCurrentWord = (newWord) => {
    return {
        type: ACTION_SET_CURRENT_WORD,
        payload: newWord
    };
}

const setWordInfo = (newWordInfo) => {
    return {
        type: ACTION_SET_WORD_INFO,
        payload: newWordInfo
    }
}

export {
    setCurrentWord,
    setWordInfo
};