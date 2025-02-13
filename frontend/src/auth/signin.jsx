import React from 'react';
import Form, { useForm } from '../shared/form/form';

const SignInPage = () => {
    const form = useForm({
        username: 'required',
        password: 'required',
    }, (values) => {
        alert(JSON.stringify(values))
    });
    
    return <Form form={form}>
        <Form.Fields.TextInput name="username" label="Benutzername" hint="Kann auch eine Email sein"/>
        <Form.Fields.TextInput name="password" label="Passwort" />
        <button onClick={form.handleSubmit}>Submit</button>
    </Form>
}

export default SignInPage;