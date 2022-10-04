export class User{
    constructor(public userId:number,
        public username:string,
        public enable: boolean,
        public lastLoginDate: Date,
        public isAdmin: boolean){}
}