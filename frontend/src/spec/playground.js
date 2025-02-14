import React from 'react';
import Form, { Is, useForm } from '../shared/form';
import { DataBucketForm, FieldWizzard, OrganizationForm, OrganizationList, OrganizationSelect, UserProvider, useUserProvider } from '../shared/organization-form';
import { CssBaseline } from '@mui/material'
import { pub, Snackbar, SUCCESS } from '../shared/snackbar';
import Card from '../shared/card';
import { List, ListItem, ListItemText, Button } from '@mui/material'

const components = [];

const registerSpec = (title, description, Component) => {
    components.push(() => {
        return <>
            <Card style={{padding: 8, border: '1px solid black'}}>
                <Card.Header>{title}</Card.Header>
                {description && <p>{description}</p>}
                <hr style={{flexGrow: 1}}></hr>
                <Card.Content>
                    <Component/>
                </Card.Content>
            </Card>
        </>
    })
}
registerSpec('Forms', 'form with error handling.', () => {
    const form = useForm({
        username: [Is.required, Is.minLength(2)],
        password: Is.required,
        textarea: Is.required,
        file: [Is.required, Is.contentType('image/png')],
        select: Is.required,
    }, (values) => {
        console.log(values);
    });
    
    return <Form form={form}>
        <Form.Fields.TextInput name="username" label="Benutzername" hint="Kann auch eine Email sein"/>
        <Form.Fields.TextInput name="password" label="Passwort" />
        <Form.Fields.TextArea name="textarea" label="Textarea" />
        <Form.Fields.FileUpload name="file" label="Sample file" />
        <Form.Fields.Select name="select" label="Select" options={['Hallo Welt', 'Hallo test']} allowEmpty={true}/>
        <Button type="submit">Submit</Button>
    </Form>
});

registerSpec('Organization Form', undefined, () => {
    return <OrganizationForm/>
})

registerSpec('OrganizationList', undefined, () => {
    return <OrganizationList/>
})

registerSpec('DataBucketForm', undefined, () => {
    return <UserProvider override={{organization: {id: 1, name: 'Test'}}}>
        <OrganizationSelect/>
        <DataBucketForm/>
    </UserProvider>
});

registerSpec('OrganizationSelect', undefined, () => {
    const Debug = () => {
        const context = useUserProvider();
        
        return <p>{context.organization?.name}</p>
    }
    return <UserProvider>
        <Debug/>
        <OrganizationSelect/>
    </UserProvider>
});

registerSpec('Snackbar', 'The snackbar is calculating the time it needs to take to read the text.', () => {
    const newNotification = (text) => {
        pub(text, SUCCESS);
    }
    return <>
        <Button onClick={() => newNotification('Hallo Welt das ist ein langer Test, der etwas zum lesen braucht.')}>trigger long notification</Button>
        <Button onClick={() => newNotification('OK')}>trigger short notification</Button>
    </>
});

registerSpec('List', 'The list component', () => {
    return <List >
        {['hallo', 'welt'].map(c => <ListItem><ListItemText>{c}</ListItemText></ListItem>)}
    </List>
});

registerSpec('FieldWizzard', undefined, () => {
    return <FieldWizzard/>
});

export const Playground = () => {
    return <>
        <CssBaseline/>
        {components.map((C) => <C/>)}
        <Snackbar/>
    </>
}
