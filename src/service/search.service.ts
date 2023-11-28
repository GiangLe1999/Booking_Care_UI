import axios from "../axios";
import { GetSearchResultsOutput } from "../dtos/search.dto";

export const getSearchResults = async (
  query: string
): Promise<GetSearchResultsOutput> => {
  try {
    if (query && query.length > 0) {
      const { data } = await axios.get(`/api/search?query=${query}`);
      return data as GetSearchResultsOutput;
    } else {
      return { ok: false, error: "Missing required parameter" };
    }
  } catch (error) {
    return { ok: false, error: "Could not load results" };
  }
};
