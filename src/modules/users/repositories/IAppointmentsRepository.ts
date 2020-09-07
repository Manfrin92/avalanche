import Appointment from '../infra/typeorm/entities/User';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

interface IAppointmentsRepository {
  create(date: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | null>;
}

export default IAppointmentsRepository;
