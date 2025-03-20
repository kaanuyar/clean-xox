import loginPath from './login-path'
import registerPath from './register-path'
import createMatchPath from './create-match-path'
import joinMatchPath from './join-match-path'
import playMatchPath from './play-match-path'
import getMatchPath from './get-match-path'

export const pathRegistryFunctions = [
    registerPath, 
    loginPath, 
    getMatchPath,
    createMatchPath, 
    joinMatchPath, 
    playMatchPath
];