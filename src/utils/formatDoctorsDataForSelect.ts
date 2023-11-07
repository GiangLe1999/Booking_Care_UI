import { getAllDoctors } from "../service/doctor.service";

export const formatDoctorsDataForSelect = async () => {
  const res = await getAllDoctors();

  if (res.doctors) {
    const formattedDoctors = res.doctors.map((doctor) => ({
      label: `${doctor.firstName} ${doctor.lastName}`,
      value: doctor.id.toString(),
    }));

    return formattedDoctors as { label: string; value: string }[];
  }
};
