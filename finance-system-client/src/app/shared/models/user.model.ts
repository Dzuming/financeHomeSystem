export class User {
    public id: number;
    public Name: {
        'First': string,
        'Second': string
    };
    public Email: string;
    public Avatar: {
        'data': String,
        'contentType': String
    }
}
