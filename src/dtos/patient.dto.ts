export interface BookScheduleInput {
  doctorId: number;
  doctorName: string;
  timeType: string;
  time: string;
  date: string;
  patientName: string;
  email: string;
  address: string;
  gender: string;
  phone: string;
  dateOfBirth: string;
  reason: string;
}

export interface BookingVerifyInput {
  doctorId: string;
  token: string;
}
