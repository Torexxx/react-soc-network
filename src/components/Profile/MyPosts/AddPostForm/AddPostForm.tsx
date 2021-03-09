import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {fieldCreator, GetStringKeys, TextArea} from "../../../common/FormControls/FormControls";
import {maxLength, number, required} from "../../../../utils/Form-validator";

const maxLength15 = maxLength(15);

export type AddPostFormValues = {
    newPostText: string
};

export type Props = {};

type PostFormValuesKeys = GetStringKeys<AddPostFormValues>;

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValues, Props> & Props> = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            {fieldCreator<PostFormValuesKeys>("newPostText", TextArea,{},[required, number, maxLength15],"Ввелите текст поста")}
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValues, Props>({form: 'postAddMessageForm'})(AddPostForm);
