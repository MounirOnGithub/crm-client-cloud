import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/crm-client'),
    ClientModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
