import React, { Component } from 'react';
import { View } from 'react-native'; 
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
   
    state = { loggedIn: null };

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyBNUFSBYeCXOPQdTRI9PLXwecEt8UfTkSg',
            authDomain: 'auth-e971a.firebaseapp.com',
            databaseURL: 'https://auth-e971a.firebaseio.com',
            projectId: 'auth-e971a',
            storageBucket: 'auth-e971a.appspot.com',
            messagingSenderId: '319700108399'
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {

            case true: 
            return (
            <CardSection>
                <Button 
                onPress={() => firebase.auth().signOut()} 
                > Log out 
                </Button>
            </CardSection>
            );

            case false: 
            return <LoginForm />;

            default:
            return <Spinner size='large' />;

        }
    }

    render() {
        return (
            <View>
                <Header title="Authentication" />
                    {this.renderContent()}
            </View>
        );
    }
}

export default App; 
