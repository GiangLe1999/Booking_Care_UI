import { CoreOutput } from "./common.dto";

export interface FetchedCode {
  id: number;
  keyMap: string;
  type: string;
  valueEn: string;
  valueVi: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCodesByTypeOutput extends CoreOutput {
  codes?: FetchedCode[];
}
