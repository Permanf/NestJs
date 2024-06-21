import * as bcrypt from "bcrypt";

export function encodePassword(password: string){
    const SALT = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, SALT)
    return hash
}

export function comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash)
}