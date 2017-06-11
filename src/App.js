import React, { Component } from 'react';
import { View, Button } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner } from './components';
import LoginForm from './components/LoginForm';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
    };
  }

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCcFDaGxLwHw1nYZeRLczkV0OJnLNhaZHM',
      authDomain: 'reactnative-95139.firebaseapp.com',
      databaseURL: 'https://reactnative-95139.firebaseio.com',
      storageBucket: 'reactnative-95139.appspot.com',
      messagingSenderId: '321385687390',
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
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
        return <Button onPress={() => firebase.auth().signOut()} title="Logout" color="#841584" />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header title="Auth" />
        { this.renderContent() }
      </View>
    );
  }
}

export default App;
