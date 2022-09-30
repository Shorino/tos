export class OrderShowUsername {
    constructor(public orderId: number,
                public itemName: string,
                public quantity: number,
                public username: string,
                public teaSession: number,
                public teaSessionName: string,
                public editing: boolean = false) {
    }
}