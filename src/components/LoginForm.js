import React, { Component } from 'react'; 
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common'; 

class LoginForm extends Component {

    constructor(props) {
        super(props); 
        this.state = { email: '', password: '', error: '', loading: false };
    }

    onButtonPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => this.onLoginSuccess())
                     .catch(() => {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(() => this.onLoginSuccess())
                                      .catch(() => this.onLoginFail());
                     });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
    }
    
    onLoginSuccess() {
        this.setState({ 
            loading: false,
            email: '',
            password: '',
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={() => this.onButtonPress()} > Login </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input  
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        label="Email"
                        placeholder="user@gmail.com"
                        secureTextEntry={false}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        label="Password"
                        placeholder="password"
                        secureTextEntry
                    />
                </CardSection> 

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20, 
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm; 
