import { FC, FormEvent, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetLanguage } from "../hooks/useGetLanguage";
import {
  enSearchPlaceholders,
  viSearchPlaceholders,
} from "../data/search-placeholders";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { getSearchResults } from "../service/search.service";
import { GetSearchResultsOutput } from "../dtos/search.dto";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StyledImage from "../components/styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";

interface Props {}

const SearchResults: FC<Props> = (props): JSX.Element => {
  const currentLanguage = useGetLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("tu-khoa");
  const [newQuery, setNewQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [specialties, setSpecialties] =
    useState<GetSearchResultsOutput["specialties"]>();
  const [clinics, setClinics] = useState<GetSearchResultsOutput["clinics"]>();
  const [doctors, setDoctors] = useState<GetSearchResultsOutput["doctors"]>();
  const [searchPlaceholderIndex, setSearchPlaceholderIndex] = useState(0);

  const fetchResults = async () => {
    if (query && query.length > 0) {
      setIsLoading(true);
      const data = await getSearchResults(query);
      if (data.clinics) {
        setClinics(data.clinics);
      }
      if (data.specialties) {
        setSpecialties(data.specialties);
      }
      if (data.doctors) {
        setDoctors(data.doctors);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setNewQuery(query);
    }

    fetchResults();
  }, [query]);

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/tim-kiem?tu-khoa=${newQuery}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPlaceholderIndex((prev) => {
        if (prev === 5) {
          return 0;
        }

        return prev + 1;
      });
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <RootHeader />

      <div className="container mt-8 mb-10">
        <form
          onSubmit={searchHandler}
          className="bg-sub_color mb-4 rounded-3xl h-[50px] flex items-center mx-auto"
        >
          <button
            type="submit"
            className="h-full aspect-square grid place-items-center"
          >
            <FaMagnifyingGlass />
          </button>

          <input
            type="text"
            name="search"
            id="search"
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
            className="outline-none bg-transparent text-normal_text placeholder:text-[#a0a0a0] text-sm flex-1"
            placeholder={
              currentLanguage === "vi"
                ? viSearchPlaceholders[searchPlaceholderIndex]
                : enSearchPlaceholders[searchPlaceholderIndex]
            }
          />
        </form>

        {isLoading ? (
          <div>
            {[...Array(10).keys()].map((item, index) => (
              <Skeleton count={1} className="w-full h-[40px] mb-2 rounded-md" />
            ))}
          </div>
        ) : (
          <>
            {specialties && specialties.length > 0 && (
              <>
                <div className="p-2 bg-[#f5f5f5] text-sm font-semibold rounded-md">
                  Chuyên khoa
                </div>
                {specialties.map((specialty) => (
                  <Link
                    className="flex items-center gap-2 py-2 px-2 border-b"
                    to={`/specialty/${specialty.id}`}
                  >
                    <StyledImage
                      src={arrayBufferToBase64(specialty.image)}
                      alt={specialty.name}
                      wrapperClasses="w-10 h-10 rounded-md"
                      imageClasses="rounded-md"
                    />

                    <h3 className="text-sm">{specialty.name}</h3>
                  </Link>
                ))}
              </>
            )}
            {clinics && clinics.length > 0 && (
              <>
                <div className="p-2 bg-[#f5f5f5] text-sm font-semibold rounded-md">
                  Cơ sở y tế
                </div>
                {clinics.map((clinic) => (
                  <Link
                    className="flex items-center gap-2 py-2 px-2 border-b"
                    to={`/clinic/${clinic.id}`}
                  >
                    <StyledImage
                      src={arrayBufferToBase64(clinic.image)}
                      alt={clinic.name}
                      wrapperClasses="w-10 h-10 rounded-md"
                      imageClasses="rounded-md"
                    />

                    <h3 className="text-sm">{clinic.name}</h3>
                  </Link>
                ))}
              </>
            )}
            {doctors && doctors.length > 0 && (
              <>
                <div className="p-2 bg-[#f5f5f5] text-sm font-semibold rounded-md">
                  Bác sĩ
                </div>
                {doctors.map((doctor) => (
                  <Link
                    className="flex items-center gap-2 py-2 px-2 border-b"
                    to={`/user/${doctor.id}`}
                  >
                    <StyledImage
                      src={arrayBufferToBase64(doctor.image)}
                      alt={doctor.lastName}
                      wrapperClasses="w-10 h-10 rounded-md"
                      imageClasses="rounded-md"
                    />

                    <h3 className="text-sm">
                      Bác sĩ {doctor.firstName} {doctor.lastName}
                    </h3>
                  </Link>
                ))}
              </>
            )}
          </>
        )}
      </div>

      <RootFooter />
    </>
  );
};

export default SearchResults;
