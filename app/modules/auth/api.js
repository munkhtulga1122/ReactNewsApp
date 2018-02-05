import axios from 'axios';

import firebase from "../../config/firebase";

const auth = firebase.auth();
const database = firebase.database();
const provider = firebase.auth.FacebookAuthProvider;

const imageSize = 120;

//Create the new user using email and password
export function createUserWithEmailAndPassword (data, callback) {
    var { email, password } = data;
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => callback(true, user, null))
        .catch((error) => callback(false, null, error));
}

//Sign the user in with their email and password
export function signInWithEmailAndPassword (data, callback) {
    var { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => callback(true, user, null))
        .catch((error) => callback(false, null, error));
}

// ========================================================================================>

// Get the user's info using Facebook's Graph API
export function signInWithFacebook (fbToken, callback) {
    var api = `https://graph.facebook.com/me?fields=id,first_name,last_name,gender,birthday&access_token=${fbToken}`;
    axios.get(api)
        .then(res => res.data)
        .then((fbData) => {
            fbData['token'] = fbToken;
            fbData['profileImage'] = `https://graph.facebook.com/${fbData.id}/picture?height=${imageSize}`
            this.signIn(fbData, callback)
        })
        .catch(error => callback(false, null, {message: error}))
}

//Sign the user in
export function signIn (fbData, callback) {
    const credential = provider.credential(fbData.token);
    auth.signInWithCredential(credential)
        .then((user) => this.checkUserExist(user, fbData, callback))
        .catch((error) => callback(false, null, {message: error}));
}

//Check if the user exist in the realtime database
export function checkUserExist (user, fbData, callback) {
    database.ref('/users/' + user.uid).once('value')
        .then(function(snapshot) {
            var exists = (snapshot.val() === null) ? false : true;
            var data = {newUser: !exists, user: user};

            if (exists) callback(true, data, null);//return
            else this.createUser(user.uid, fbData, callback)
        })
        .catch(error => callback(false, null, {message: error}));
}

export function createUser (userId, data, callback) {
    database.ref('users').child(userId).set({ ...data })
        .then(() =>  callback(true, data, null)) //return
        .catch((error) => callback(false, null, {message: error}));
}

export function updateUser (userId, data, callback) {
    database.ref('users').child(userId).update({ ...data })
        .then(() =>  {callback(true, data, null)}) //return
        .catch((error) => callback(false, null, {message: error}));
}

export function signOut (callback) {
    auth.signOut().then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}