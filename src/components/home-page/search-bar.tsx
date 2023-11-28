import { FC, FormEvent, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import {
  enSearchPlaceholders,
  viSearchPlaceholders,
} from "../../data/search-placeholders";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import { useNavigate } from "react-router-dom";

interface Props {}

const Searchbar: FC<Props> = (props): JSX.Element => {
  const currentLanguage = useGetLanguage();

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [searchPlaceholderIndex, setSearchPlaceholderIndex] = useState(0);

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

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/tim-kiem?tu-khoa=${query}`);
  };

  return (
    <form
      onSubmit={searchHandler}
      className="bg-sub_color min-w-[300px] rounded-3xl h-[50px] flex items-center max-w-[450px] mx-auto mb-16"
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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="outline-none bg-transparent text-normal_text placeholder:text-[#a0a0a0] text-sm flex-1"
        placeholder={
          currentLanguage === "vi"
            ? viSearchPlaceholders[searchPlaceholderIndex]
            : enSearchPlaceholders[searchPlaceholderIndex]
        }
      />
    </form>
  );
};

export default Searchbar;
