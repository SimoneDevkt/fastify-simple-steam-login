import fp from 'fastify-plugin'
import loginSteam from 'simple-steam-login'

function LoginSteam(fastify, opts, done) {
    fastify.decorate('loginSteam', new loginSteam(opts))
    done()
}
export default fp(LoginSteam);