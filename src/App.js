import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Item from './Item/Item';

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

  constructor(props){
    super(props);

    this.state = {
      items: [
        { id: 1, itemContent: "test1 is a longer set of characters"},
        { id: 2, itemContent: "test2"},
      ],
    }
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
            <h3>Your To-Do List</h3>
            <div>
              {
                this.state.items.map((item) => {
                  return (
                    <Item itemContent={item.itemContent} itemId={item.id} key={item.id}/>
                  )
                })
              }
            </div>
            <div className="addItemBody">
              <p>Add Item</p><button>Add</button>
            </div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
        ) : (
          <span>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </span>
          
        )
      }</div>
      {this.state.isSignedIn ? (
          <span>
            <footer className="App-footer">
            <p>{firebase.auth().currentUser.displayName} Signed In</p>
            </footer>
          </span>
        ) : (
          <span>
            <footer className="App-footer">
            <p>Not Signed In</p>
            </footer>
          </span>
        )}
      </div>
    );
  }
}

export default App;

