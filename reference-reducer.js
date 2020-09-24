const INITIAL_STATE = {
    referenceTo: '',
    referenceFrom: '',
    flashCards: []
}

const referenceReducer = (state = INITIAL_STATE, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'UPDATE_REFERENCE_TO':
           return {
               ...state,
               referenceTo: action.payload
           }
        case 'UPDATE_REFERENCE_FROM':
            return {
                ...state,
                referenceTo: action.payload
            }
        case 'ADD_FLASHCARD':
        case 'UPDATE_FLASHCARD':
        case 'DELETE_FLASHCARD':
        default: return state
    }
}

export default referenceReducer;
