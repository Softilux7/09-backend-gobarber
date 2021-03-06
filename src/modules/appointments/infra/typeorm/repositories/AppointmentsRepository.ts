import { Repository, getRepository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

// private appointments: Appointment[];

// constructor() {
//   this.appointments = [];
// }

// public all(): Appointment[] {
//   return this.appointments;
// }
// @EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  };
}

export default AppointmentsRepository;
// const findAppointment = this.appointments.find(appointment =>
//   isEqual(date, appointment.date),
// );

// public create({ provider, date }: CreateAppointmentDTO): Appointment {
//   const appointment = new Appointment({ provider, date });
//   this.appointments.push(appointment);
//   return appointment;
// }

