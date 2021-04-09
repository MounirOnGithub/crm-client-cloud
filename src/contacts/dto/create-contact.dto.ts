export class CreateContactDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly role: string;
  readonly contactDate: Date;
}
