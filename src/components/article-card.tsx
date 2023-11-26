import { FC } from "react";
import { FetchedArticle } from "../dtos/articles.dto";
import { Link } from "react-router-dom";
import StyledImage from "./styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import moment from "moment";

interface Props {
  categorySlug: string;
  article: FetchedArticle | undefined;
  reloadDocument?: boolean;
}

const ArticleCard: FC<Props> = ({
  article,
  categorySlug,
  reloadDocument,
}): JSX.Element => {
  return (
    <Link
      reloadDocument={reloadDocument}
      to={`/${categorySlug}/${article?.slug}`}
      className="border shadow-md rounded-md block m-1"
    >
      <StyledImage
        src={arrayBufferToBase64(article?.thumbnail)}
        alt={article?.title || ""}
        wrapperClasses="w-full aspect-[1.9]"
        imageClasses="rounded-t-md"
      />

      <div className="py-5 px-4">
        <h4 className="font-semibold mb-3 line-clamp-2">{article?.title}</h4>
        <p className="flex items-center text-[10px] gap-1">
          Xuất bản:{" "}
          <span>{moment(article?.createdAt).format("DD/MM/YYYY")}</span> | Cập
          nhật lần cuối:{" "}
          <span>{moment(article?.updatedAt).format("DD/MM/YYYY")}</span>
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
