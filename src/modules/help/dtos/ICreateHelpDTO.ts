export default interface ICreateHelpDTO {
  name: string;
  email: string;
  title: string;
  description: string;
  observation: string;
  addressZipCode: string;
  addressStreet: string;
  addressNumber: string;
  addressCity: string;
  addressState: string;
  addressComplement: string;
  addressArea: string;
  addressCountry: string;
  helpDate: Date;
  typeId: string;
  userManagerId: string;
  typeStatusId: string;
  helpedDateType: string;
}
