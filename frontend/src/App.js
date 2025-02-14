import React from 'react';
import SignInPage from './auth/signin';
import { UserProvider } from './shared/organization-form';
import { Snackbar } from './shared/snackbar';
import { CssBaseline } from '@mui/material'

const App = () => {
    return <UserProvider>
        <CssBaseline/>
        <SignInPage/>
        <Snackbar/>
    </UserProvider>
}
export default App;