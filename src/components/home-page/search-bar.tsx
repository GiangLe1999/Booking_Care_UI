import { FC, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  enSearchPlaceholders,
  viSearchPlaceholders,
} from "../../data/search-placeholders";

interface Props {}

const Searchbar: FC<Props> = (props): JSX.Element => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

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

  return (
    <div className="bg-sub_color min-w-[300px] rounded-3xl h-[50px] flex items-center max-w-[450px] mx-auto mb-16">
      <div className="h-full aspect-square grid place-items-center">
        <FaMagnifyingGlass />
      </div>

      <input
        type="text"
        name="search"
        id="search"
        className="outline-none bg-transparent text-normal_text placeholder:text-[#a0a0a0] text-sm flex-1"
        placeholder={
          currentLanguage === "vi"
            ? viSearchPlaceholders[searchPlaceholderIndex]
            : enSearchPlaceholders[searchPlaceholderIndex]
        }
      />
    </div>
  );
};

export default Searchbar;
