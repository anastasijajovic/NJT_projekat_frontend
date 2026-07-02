export class HttpResponse{

    timestamp: Date;
    statusCode: Number;
    status: string;
    reasone: string;
    message: string;

    data!: {values: Object[], value: Object};

    constructor(timestamp: Date, statusCode: number, status: string, reasone: string, message: string, data: { values: Object[], value: Object }){
        this.timestamp = timestamp;
        this.statusCode = statusCode;
        this.status = status;
        this.reasone = reasone;
        this.message = message;
        this.data = data;
    }

}