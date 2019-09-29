import { Deserializable } from './deserializable.model';

export class Product implements Deserializable {
    public serial: string;
    public name: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
