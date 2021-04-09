import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  role: string;

  @Prop({ required: true })
  contactDate: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
