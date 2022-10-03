export class TeaSessionShowUsername{
    constructor(public name:string,
        public description:string,
        public username:string,
        public password:string,
        public treatDate:Date,
        public cutOffDate:Date,
        public visibility:boolean,
        public menu:string){}
}