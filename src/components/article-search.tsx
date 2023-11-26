import { FC, FormEvent, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface Props {
  categorySlug: string;
}

const ArticleSearch: FC<Props> = ({ categorySlug }): JSX.Element => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!query && !query.trim()) {
      return;
    }

    navigate(`/${categorySlug}/tim-kiem?tu-khoa=${query}`);
  };

  return (
    <form
      onSubmit={searchHandler}
      className="bg-[#f5f5f5] min-w-[300px] rounded-3xl h-[50px] flex items-center max-w-[450px] mb-12"
    >
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        name="search"
        id="search"
        className="px-4 outline-none bg-transparent text-normal_text placeholder:text-[#a0a0a0] text-sm flex-1"
        placeholder="Tìm kiếm bài viết"
      />

      <button
        type="submit"
        className="h-full aspect-square grid place-items-center"
      >
        <FaMagnifyingGlass />
      </button>
    </form>
  );
};

export default ArticleSearch;
