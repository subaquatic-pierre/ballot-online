import React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
    CssBaseline,
    ThemeProvider,
    Container
} from '@material-ui/core';

import Header from './Header'
import theme from '../theme'

const ADMIN_QUERY = gql`
    query TestQuery {
        viewer {
            username
            isStaff
        }
    }
`

const Layout = ({ children }) => {
    const staffQuery = useQuery(ADMIN_QUERY)

    const admin = staffQuery.data
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header isStaff={admin && admin.viewer.isStaff} />
                <Container maxWidth='md'>
                    {children}
                </Container>
            </ThemeProvider>
        </>
    )
};

export default Layout;
