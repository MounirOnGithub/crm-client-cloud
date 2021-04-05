export class CreateClientDto {
  readonly name: string;
  readonly meetingDate: Date;
  readonly contactDate: Date;
  readonly negociationState: string;
  readonly rate: number;
  readonly skills: string[];
  readonly roleType: string;
  readonly type: string;
}
