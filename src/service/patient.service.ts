import axios from "../axios";
import { BookScheduleInput, BookingVerifyInput } from "../dtos/patient.dto";

export const bookSchedule = async (bookScheduleInput: BookScheduleInput) => {
  try {
    const { data } = await axios.post(`/api/book-schedule`, bookScheduleInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const bookingVerify = async (bookingVerifyInput: BookingVerifyInput) => {
  try {
    const { data } = await axios.put(`/api/booking-verify`, bookingVerifyInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};
