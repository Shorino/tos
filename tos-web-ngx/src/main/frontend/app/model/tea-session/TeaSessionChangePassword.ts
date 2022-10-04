export class TeaSessionChangePassword{
    constructor(public oldPassword:string, public newPassword:string){}
}

export class TeaSessionChangePasswordAdmin{
    constructor(public username:string, public userPassword:string, public teaSessionPassword:string){}
}