import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Item from './Item/Item';
import AddItem from './AddItem/AddItem';
import { config } from './Config/config';

if (!firebase.apps.length) {
  try {
      firebase.initializeApp(config)
  } catch (err) {
      console.error('Firebase initialization error raised', err.stack)
  }
}

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

  constructor(props){
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      if (user){
        
        this.uid = firebase.auth().currentUser.uid;
        const previousItems = this.state.items;
        this.db = firebase.database().ref('users/'+ this.uid).child('items');

        this.db.on('child_added', snap => {
          previousItems.push({
            id: snap.key,
            itemContent: snap.val().itemContent,
          })

          this.setState({
            items: previousItems
          })
        })

        this.db.on('child_removed', snap => {
          for(var i=0; i < previousItems.length; i++){
            if(previousItems[i].id === snap.key){
              previousItems.splice(i, 1);
            }
          }

          this.setState({
            items: previousItems
          })

        })
        }
      })

      this.state = {
        items: [],

    }    
  }

  addItem(item){
    this.db.push().set({ itemContent: item });
  }

  removeItem(itemId){
    this.db.child(itemId).remove();
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
            <br/>
            <div>
              {
                this.state.items.map((item) => {
                  return (
                    <Item itemContent={item.itemContent} 
                    itemId={item.id} 
                    key={item.id}
                    removeItem={this.removeItem}/>
                  )
                })
              }
            </div>
            <div>
              <AddItem addItem={this.addItem} />
            </div>
            <button className="signOutButton" onClick={() => firebase.auth().signOut()}>Sign out!</button>
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
            <p>Signed In</p>
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
