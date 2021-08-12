import React, {Component} from 'react';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router-dom';
import Routes from './Routes';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient, InMemoryCache} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootswatch/dist/slate/bootstrap.min.css';

import './App.css';

const browserHistory = createBrowserHistory();

const link = createHttpLink(
    {
        uri: process.env.REACT_APP_API_URI,
    }
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});



export default class App extends Component {
  render(){
    return(
        <ApolloProvider client={client}>
            <Router history={browserHistory}>
                <Routes/>
            </Router>
        </ApolloProvider>
    )
  }
}
