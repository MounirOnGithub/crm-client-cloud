import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Res() res, @Body() createContactDto: CreateContactDto) {
    try {
      const client = this.contactsService.create(createContactDto);
      return res.status(HttpStatus.CREATED).json(client);
    } catch (error) {
      throw error;
    }
  }

  // @Get()
  // findAll() {
  //   return this.contactsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const client = this.contactsService.findOne(id);
      if (!client) throw new NotFoundException('Contact not existing');
      return client;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    try {
      const contact = this.contactsService.update(id, updateContactDto);
      if (!contact) {
        throw new NotFoundException('Contact does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Contact has been successfully updated',
        contact,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Contact not updated!',
        status: 400,
      });
    }
  }

  @Delete(':id')
  remove(@Res() res, @Param('id') id: string) {
    if (!id) {
      throw new NotFoundException('Contact ID does not exist');
    }
    const contact = this.contactsService.remove(id);
    if (!contact) {
      throw new NotFoundException('Contact does not exist');
    }

    return res.status(HttpStatus.NO_CONTENT).json({
      message: 'Contact has been deleted',
      contact,
    });
  }
}
