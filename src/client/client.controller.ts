import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Query,
  HttpStatus,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationQueryDto } from './dto/paginationquery-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Res() res, @Body() createClientDto: CreateClientDto) {
    try {
      const client = this.clientService.create(createClientDto);
      return res.status(HttpStatus.CREATED).json(client);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const client = this.clientService.findOne(id);
      if (!client) throw new NotFoundException('Client not existing');
      return client;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll(@Res() res, @Query() paginationQuery: PaginationQueryDto) {
    try {
      const clients = this.clientService.findAll(paginationQuery);
      return res.status(HttpStatus.OK).json(clients);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      const client = this.clientService.update(id, updateClientDto);
      if (!client) {
        throw new NotFoundException('Client does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Client has been successfully updated',
        client,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Customer not updated!',
        status: 400,
      });
    }
  }

  @Delete(':id')
  remove(@Res() res, @Param('id') id: string) {
    if (!id) {
      throw new NotFoundException('Client ID does not exist');
    }
    const client = this.clientService.remove(id);
    if (!client) {
      throw new NotFoundException('Client does not exist');
    }

    return res.status(HttpStatus.NO_CONTENT).json({
      message: 'Client has been deleted',
      client,
    });
  }
}
