import { makeRegisterPath } from './register-path'
import { makeLoginPath } from './login-path'
import { makeCreateMatchPath } from './create-match-path'
import { makeJoinMatchPath } from './join-match-path'
import { makePlayMatchPath } from './play-match-path'
import { makeGetMatchPath } from './get-match-path'

export const pathRegistryFunctions = [
    makeRegisterPath, 
    makeLoginPath, 
    makeGetMatchPath,
    makeCreateMatchPath, 
    makeJoinMatchPath, 
    makePlayMatchPath
];