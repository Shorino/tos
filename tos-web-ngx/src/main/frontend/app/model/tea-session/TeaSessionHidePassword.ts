export class TeaSessionHidePassword{
    teaSessionId:number;
    name:string;
    description:string;
    username:string;
    hasPassword:boolean;
    treatDate:Date;
    cutOffDate:Date;
    visibility:boolean;
    menu:string;

    get getTreatDate(){
        return new Date(this.treatDate);
    }
    get getCutOffDate(){
        return this.cutOffDate.getUTCDate();
    }
}