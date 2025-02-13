import React from 'react';
import Form, { useForm } from '../shared/form/form';

const components = [];

const registerSpec = (title, description, Component) => {
    components.push(() => {
        return <>
            <div style={{padding: 8, border: '1px solid black'}}>
                <h2>{title}</h2>
                <p>{description}</p>
                <hr></hr>
                <Component/>
            </div>
        </>
    })
}
registerSpec('Forms', 'form with error handling.', () => {
    const form = useForm({
        username: 'required',
        password: 'required',
        textarea: 'required'
    }, (values) => {
        alert(JSON.stringify(values))
    });
    
    return <Form form={form}>
        <Form.Fields.TextInput name="username" label="Benutzername" hint="Kann auch eine Email sein"/>
        <Form.Fields.TextInput name="password" label="Passwort" />
        <Form.Fields.TextArea name="textarea" label="Textarea" />
        <button onClick={form.handleSubmit}>Submit</button>
    </Form>
});

registerSpec('Test', undefined, () => {
    return <></>
})

export const Explorer = () => {
    return <>
    {components.map((C) => <C/>)}
    </>
}