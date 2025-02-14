import React from 'react';
import Form, { Is, useForm } from '../shared/form';
import { Button } from '@mui/material'

const SignInPage = () => {
    const form = useForm({
        username: Is.required,
        password: Is.required,
    }, (values, notify) => {
        notify(JSON.stringify(values, undefined, 2))
    });
    
    return <Form form={form}>
        <Form.Fields.TextInput name="username" label="Benutzername" hint="Kann auch eine Email sein"/>
        <Form.Fields.TextInput name="password" label="Passwort" />
        <Button>Submit</Button>
    </Form>
}

export default SignInPage;