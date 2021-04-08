import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Contact } from 'src/contacts/schemas/contact.schema';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }] })
  contacts: Contact[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
