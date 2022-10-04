export class UserEnable{
    constructor(public username:string, 
        public password:string,
        public usernameToEnable:string,
        public enable: boolean){}
}