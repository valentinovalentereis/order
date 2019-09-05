export class Guid {
    constructor(public guid: string) {
        this._guid = guid;
    }

    private _guid: string;

    // Static member
    public static New(): Guid {
        let result = '';

        for (let j = 0; j < 32; j++) {
            if (j === 8 || j === 12 || j === 16 || j === 20) {
                result = result + '-';
            }
            const i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result = result + i;
        }

        return new Guid(result);
    }

    public ToString(): string {
        return this.guid;
    }
}

