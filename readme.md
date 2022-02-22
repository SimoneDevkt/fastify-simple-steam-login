Wrapper for simple-steam-login

# How to use
Install
```
npm i fastify-simple-steam-login
```

# Example:
Generate steam api key on https://steamcommunity.com/dev/apikey

```
import Fastify from 'fastify'
import LoginSteam from 'fastify-simple-steam-login'

const fastify = Fastify()

const port = 3000;

const STEAM_API = `<your_api_key>`;
const STEAM_CALLBACK_URI = `http://localhost:${port}/login/callback`;
const REALM = `http://localhost`;

fastify.register(LoginSteam, {
    realm: REALM, // Site name displayed to users on logon
    returnUrl: STEAM_CALLBACK_URI, // Your return route
    apiKey: STEAM_API //Steam API key   
})

fastify.get('/login', async function login(request, reply) {
    reply.redirect(this.loginSteam.get_URL_redirect());// Get redirect url for Steam
});

fastify.get('/login/callback', async function callback(request, reply) {
    try {
        let data = await this.loginSteam.authenticate(request.query);
        //login success, use data params to identify the user
        reply.send(data);
    } catch (err) {
        //login failed
        reply.send({ err })
    }
});

fastify.listen(port)
```