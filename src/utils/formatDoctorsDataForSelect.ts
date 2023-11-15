import { getAllDoctors } from "../service/doctor.service";
import { getAllSpecialties } from "../service/specialty.service";

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

export const formatSpecialtiesDataForSelect = async () => {
  const res = await getAllSpecialties();

  if (res.specialties) {
    const formattedSpecialties = res.specialties.map((specialty) => ({
      label: specialty.name,
      value: specialty.id.toString(),
    }));

    return formattedSpecialties as { label: string; value: string }[];
  }
};
