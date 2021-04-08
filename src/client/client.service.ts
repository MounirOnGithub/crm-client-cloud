import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Client, ClientDocument } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationQueryDto } from './dto/paginationquery-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  findOne(id: string): Promise<Client> {
    const client = this.clientModel
      .findById({
        _id: id,
      })
      .exec();

    if (!client) throw new NotFoundException(`Client #${id} not found`);
    return client;
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<Client[]> {
    const { limit, offset } = paginationQuery;
    return this.clientModel.find().skip(offset).limit(limit).exec();
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    const existingClient = this.clientModel
      .findByIdAndUpdate({ _id: id }, updateClientDto)
      .exec();

    if (!existingClient) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return existingClient;
  }

  remove(id: string) {
    const deletedClient = this.clientModel.findByIdAndDelete({ _id: id });

    return deletedClient;
  }
}
