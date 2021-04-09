import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  create(createContactDto: CreateContactDto) {
    const createdContact = new this.contactModel(createContactDto);
    return createdContact.save();
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: string) {
    const contact = this.contactModel
      .findById({
        _id: id,
      })
      .exec();

    if (!contact) throw new NotFoundException(`Contact #${id} not found`);
    return contact;
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    const existingContact = this.contactModel
      .findByIdAndUpdate({ _id: id }, updateContactDto)
      .exec();

    if (!existingContact) {
      throw new NotFoundException(`Contact #${id} not found`);
    }

    return existingContact;
  }

  remove(id: string) {
    const deletedContact = this.contactModel.findByIdAndDelete({ _id: id });

    return deletedContact;
  }
}
