import React from 'react';
import { reduxForm, Field } from 'redux-form';

const AddMessageForm = ({ handleSubmit}: any) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field  component="textarea" name={'newMessageBody'} placeholder='Enter text'/>
            <button>Send</button>
        </form>
    )
}

export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);



