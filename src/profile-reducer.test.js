import profileReducer, {addPostAC, deletePost} from "./redux/profile-reducer";

let initialState = {

    posts: [
        {id: 1, message: 'Hello',likesCount: 1},
        {id: 2, message: 'Hi',likesCount: 1},
    ],
};

it('new post length of post should be incremented', () => {
    let action = addPostAC('It-kamasutra');
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3);

})

it('name of new post should be correct', () => {
    let action = addPostAC('Hello!');
    let newState = profileReducer(initialState, action);

    expect(newState.posts[2].message).toBe("Hello!");
})

it('after delete post length should decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(1);
})

it('if id is incorrect length should not be decremented', () => {
    let action = deletePost(1000);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(2);
})
