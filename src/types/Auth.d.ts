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

export type { IRegister, IActivation };