import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Card, CardItem, Input, Spinner } from './index';

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 20,
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      spinner: false,
    };
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  authenticateUser() {
    const { email, password } = this.state;
    this.setState({ error: '', spinner: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loginSuccess.call(this);
      })
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            this.loginSuccess.call(this);
          })
          .catch(() => {
            this.loginFailure.call(this);
          });
      });
  }

  loginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      spinner: false,
    });
  }

  loginFailure() {
    this.setState({
      error: 'Authentication failed',
      spinner: false,
      password: '',
    });
  }

  renderButton() {
    if (this.state.spinner) {
      return <Spinner />;
    }
    return (
      <Button
        onPress={this.authenticateUser}
        title="Login"
        color="#841584"
      />
    );
  }

  render() {
    const { errorText } = styles;
    return (
      <Card>
        <CardItem>
          <Input
            placeholder="Enter your email"
            autoCorrect={false}
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardItem>
        <CardItem>
          <Input
            secureTextEntry
            placeholder="Enter your password"
            autoCorrect={false}
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardItem>
        <Text style={errorText}>
          { this.state.error }
        </Text>
        <CardItem>
          <View>
            { this.renderButton() }
          </View>
        </CardItem>
      </Card>
    );
  }
}

export default LoginForm;
