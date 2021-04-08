import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Prop()
  contactDate: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
