const ADD_POST =  'ADD_POST';
const UPDATE_NEW_POST_TEXT =  'UPDATE_NEW_POST_TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hello',likesCount: 1},
        {id: 2, message: 'Hi',likesCount: 1},
    ],
    newPostText: '',
};

const profileReducer = (state = initialState, action: { type: string, payload?: { newText: string} }) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: Date.now(), message: state.newPostText, likesCount: 1
            }
             return {
                ...state, newPostText: '', posts: [...state.posts, newPost]
            };

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state, newPostText: action.payload!.newText
            };

        default:
            return state;
    }
}

export const addPostAC = () => ({type: ADD_POST});
export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, payload: { newText: text }});

export default profileReducer;
