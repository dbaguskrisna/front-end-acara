import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
interface IRegister {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface IActivation {
    code: string;
}

interface ILogin {
    identifier: string;
    password: string;
}

interface UserExtended extends User {
    accessToken?: string;
    role?: string;
}

interface SessionExtend extends Session {
    accessToken?: string;
}

interface JWTExtended extends JWT {
    user?: UserExtended;
}

export type { IRegister, IActivation, JWTExtended, SessionExtend, UserExtended, ILogin };