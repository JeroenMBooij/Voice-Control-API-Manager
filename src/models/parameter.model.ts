import { getModelForClass, prop } from '@typegoose/typegoose';

export class Parameter {
    @prop({ type: () => String, required: true })
    public key!: string;

    @prop({ type: () => String, required: true })
    public value!: string;
}

const ParameterModel = getModelForClass(Parameter);

export { ParameterModel }

