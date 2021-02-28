import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {fieldCreator, TextArea} from "../../common/FormControls/FormControls";
import {maxLength, required} from "../../../utils/Form-validator";
import { MessageFormValues } from '../Dialogs';

const maxLength50 = maxLength(50);

type Props = {};

type MessageFormValuesKeys = Extract<keyof MessageFormValues, string>;

const AddMessageForm: React.FC<InjectedFormProps<MessageFormValues, Props> & Props> = ({ handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {fieldCreator<MessageFormValuesKeys>("newMessageBody", TextArea,{},[required, maxLength50],'Enter text')}
            <button>Send</button>
        </form>
    )
}

export default reduxForm<MessageFormValues, Props>({form: 'dialogAddMessageForm'})(AddMessageForm);
