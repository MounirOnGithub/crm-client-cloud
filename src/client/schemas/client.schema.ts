import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  meetingDate: Date;

  @Prop({ required: true })
  contactDate: Date;

  @Prop({ required: true })
  negociationState: string;

  @Prop()
  rate: number;

  @Prop([String])
  skills: string[];

  @Prop()
  roleType: string;

  @Prop({ required: true })
  type: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
