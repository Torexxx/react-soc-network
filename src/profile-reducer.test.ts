import profileReducer, {actions} from "./redux/profile-reducer";

let initialState = {

    posts: [
        {id: 1, message: 'Hello',likesCount: 1},
        {id: 2, message: 'Hi',likesCount: 1},
    ],
    profile: null,
    status: '',
    newPostText: '',
    profileUpdateStatus: 'none'
};

it('new post length of post should be incremented', () => {
    let action = actions.addPost('It-kamasutra');
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3);

})

it('name of new post should be correct', () => {
    let action = actions.addPost('Hello!');
    let newState = profileReducer(initialState, action);

    expect(newState.posts[2].message).toBe("Hello!");
})

it('after delete post length should decrement', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(1);
})

it('if id is incorrect length should not be decremented', () => {
    let action = actions.deletePost(1000);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(2);
})
