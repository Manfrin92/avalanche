export default interface ICreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  addressZipCode: string;
  addressStreet: string;
  addressNumber: number;
  addressComplement: string;
  addressArea: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
}
