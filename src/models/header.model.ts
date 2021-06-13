import { getModelForClass, prop } from '@typegoose/typegoose';

export class Header
{
    @prop({ type: () => String, required: true })
    public key!: string;

    @prop({ type: () => String, required: true })
    public value!: string;
}

const HeaderModel = getModelForClass(Header);

export { HeaderModel }
