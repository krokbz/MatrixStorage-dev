const functions = require("firebase-functions");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var admin = require("firebase-admin");

var serviceAccount = require("./natrixstorage-firebase-adminsdk-kvkf4-1387da1f28.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.get('/kalupi', (request, response) => {
  let res = []
  if (typeof request.query.id === 'undefined') {
      db.collection('kalupi').get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  let document = {
                      id: doc.id,
                      data: doc.data()
                  }
                  res.push(document)
              })
              return response.send(res)
          })
          .catch(function (error) {
              return response.send("Error getting documents: " + error)
          })
  } else {
      var docRef = db.collection('kalupi').doc(request.query.id)
      docRef.get()
          .then((doc) => {
              if (typeof doc.data() !== 'undefined') {
                  console.log('doc', doc.data())
                  let document = {
                      id: doc.id,
                      data: doc.data()
                  }
                  return response.send(document)
              } else {
                  return response.send(
                      "Error getting document " +
                      request.query.id +
                      ": The document is undefined"
                  )
              }
          })
          .catch(function (error) {
              return response.send(
                  "Error getting document " +
                  request.query.id +
                  ": " + error
              )
          })
  }
})

app.post('/kalupi', (request, response) => {
  if (Object.keys(request.body).length) {
      db.collection('kalupi').doc().set(request.body)
          .then(function () {
              return response.send("Document successfully written!")
          })
          .catch(function (error) {
              return response.send("Error writing document: " + error)
          })
  } else {
      return response.send("No post data for new document. A new document is not created!")
  }
})

app.put('/kalupi', (request, response) => {
  if (Object.keys(request.body).length) {
      if (typeof request.query.id !== 'undefined') {
          db.collection('kalupi').doc(request.query.id).set(request.body)
              .then(function () {
                  return response.send("Document successfully written - updated!")
              })
              .catch(function (error) {
                  return response.send("Error writing document: " + error)
              })
      } else {
          return response.send("A parameter id is not set. A document is not updated!")
      }
  } else {
      return response.send("No post data for new document. A document is not updated!")
  }
})

app.delete('/kalupi', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
      db.collection('kalupi').doc(request.query.id).delete()
          .then(function () {
              return response.send("Document successfully deleted!")
          })
          .catch(function (error) {
              return response.send("Error removing document: " + error)
          })
  } else {
      return response.send("A parameter id is not set. A document is not deleted!")
  }
})

app.get('/klijenti', (request, response) => {
  let res = []
  if (typeof request.query.id === 'undefined') {
      db.collection('klijenti').get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  let document = {
                      id: doc.id,
                      data: doc.data()
                  }
                  res.push(document)
              })
              return response.send(res)
          })
          .catch(function (error) {
              return response.send("Error getting documents: " + error)
          })
  } else {
      var docRef = db.collection('kalupi').doc(request.query.id)
      docRef.get()
          .then((doc) => {
              if (typeof doc.data() !== 'undefined') {
                  console.log('doc', doc.data())
                  let document = {
                      id: doc.id,
                      data: doc.data()
                  }
                  return response.send(document)
              } else {
                  return response.send(
                      "Error getting document " +
                      request.query.id +
                      ": The document is undefined"
                  )
              }
          })
          .catch(function (error) {
              return response.send(
                  "Error getting document " +
                  request.query.id +
                  ": " + error
              )
          })
  }
})

app.post('/klijenti', (request, response) => {
  if (Object.keys(request.body).length) {
      db.collection('klijenti').doc().set(request.body)
          .then(function () {
              return response.send("Document successfully written!")
          })
          .catch(function (error) {
              return response.send("Error writing document: " + error)
          })
  } else {
      return response.send("No post data for new document. A new document is not created!")
  }
})

app.put('/klijenti', (request, response) => {
  if (Object.keys(request.body).length) {
      if (typeof request.query.id !== 'undefined') {
          db.collection('klijenti').doc(request.query.id).set(request.body)
              .then(function () {
                  return response.send("Document successfully written - updated!")
              })
              .catch(function (error) {
                  return response.send("Error writing document: " + error)
              })
      } else {
          return response.send("A parameter id is not set. A document is not updated!")
      }
  } else {
      return response.send("No post data for new document. A document is not updated!")
  }
})

app.delete('/klijenti', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
      db.collection('klijenti').doc(request.query.id).delete()
          .then(function () {
              return response.send("Document successfully deleted!")
          })
          .catch(function (error) {
              return response.send("Error removing document: " + error)
          })
  } else {
      return response.send("A parameter id is not set. A document is not deleted!")
  }
})

app.get('/lokacije', (request, response) => {
  let res = []
  if (typeof request.query.id === 'undefined') {
      db.collection('lokacije').get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  let document = {
                      id: doc.id,
                      data: doc.data()
                  }
                  res.push(document)
              })
              return response.send(res)
          })
          .catch(function (error) {
              return response.send("Error getting documents: " + error)
          })
  } else {
      var docRef = db.collection('lokacije').doc(request.query.id)
      docRef.get()
          .then((doc) => {
              if (typeof doc.data() !== 'undefined') {
                  console.log('doc', doc.data())
                  let document = {
                      id: doc.id,
                      data: doc.data()
                  }
                  return response.send(document)
              } else {
                  return response.send(
                      "Error getting document " +
                      request.query.id +
                      ": The document is undefined"
                  )
              }
          })
          .catch(function (error) {
              return response.send(
                  "Error getting document " +
                  request.query.id +
                  ": " + error
              )
          })
  }
})

app.post('/lokacije', (request, response) => {
  if (Object.keys(request.body).length) {
      db.collection('lokacije').doc().set(request.body)
          .then(function () {
              return response.send("Document successfully written!")
          })
          .catch(function (error) {
              return response.send("Error writing document: " + error)
          })
  } else {
      return response.send("No post data for new document. A new document is not created!")
  }
})

app.put('/lokacije', (request, response) => {
  if (Object.keys(request.body).length) {
      if (typeof request.query.id !== 'undefined') {
          db.collection('lokacije').doc(request.query.id).set(request.body)
              .then(function () {
                  return response.send("Document successfully written - updated!")
              })
              .catch(function (error) {
                  return response.send("Error writing document: " + error)
              })
      } else {
          return response.send("A parameter id is not set. A document is not updated!")
      }
  } else {
      return response.send("No post data for new document. A document is not updated!")
  }
})

app.delete('/lokacije', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
      db.collection('lokacije').doc(request.query.id).delete()
          .then(function () {
              return response.send("Document successfully deleted!")
          })
          .catch(function (error) {
              return response.send("Error removing document: " + error)
          })
  } else {
      return response.send("A parameter id is not set. A document is not deleted!")
  }
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

