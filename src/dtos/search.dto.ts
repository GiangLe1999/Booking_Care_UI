import { CoreOutput } from "./common.dto";

export interface GetSearchResultsOutput extends CoreOutput {
  specialties?: { name: string; id: number; image: string }[];
  clinics?: { name: string; id: number; image: string }[];
  doctors?: {
    firstName: string;
    lastName: string;
    id: number;
    image: string;
  }[];
}
