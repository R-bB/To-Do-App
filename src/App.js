import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
  apiKey: "AIzaSyBamdjooQEKP0OBoiTMme9EglbsiUTYawk",
  authDomain: "to-do-app-684f2.firebaseapp.com",
}
firebase.initializeApp(config);

class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    }
    )
  }


  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1>To-Do</h1>
      </header>
      <div className="App-content">
      {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h3>Welcome {firebase.auth().currentUser.displayName}</h3>
          </span>
        ) : (
          <span>
            <h3>Please sign in</h3>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </span>
        )
      }</div>
      <footer className="App-footer">
        <p>footer</p>
      </footer>
      </div>
    );
  }
}

export default App;

