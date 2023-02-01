import Vue from 'vue'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBSiWYltQvlcbfoIN1l6_36J8CLqAmS36s",
    authDomain: "natrixstorage.firebaseapp.com",
    projectId: "natrixstorage",
    storageBucket: "natrixstorage.appspot.com",
    messagingSenderId: "545925923439",
    appId: "1:545925923439:web:abc528fb79a54c2a93839a",
    measurementId: "G-ZGMXDWTQJ4"
  };
firebase.initializeApp(firebaseConfig)

export default ({ Vue }) => {
  Vue.prototype.$auth = firebase.auth()
  Vue.prototype.$db = firebase.firestore()
  Vue.prototype.$storage = firebase.storage()
}

