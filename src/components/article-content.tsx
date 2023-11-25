import { FC, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { path } from "../constants";
import { DetailedFetchedArticle } from "../dtos/articles.dto";
import parse from "html-react-parser";
import StyledImage from "./styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TOC from "./toc";
import moment from "moment";
import LikeAndShare from "./like-and-share";
import Comments from "./comments";

interface Props {
  belongsTo: string;
  article: DetailedFetchedArticle | undefined;
}

const ArticleContent: FC<Props> = ({ belongsTo, article }): JSX.Element => {
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (article) {
      setThumbnail(article.thumbnail);
    }
  });

  return (
    <div>
      <div className="article-page-bg text-center mb-14">
        <div className="absolute inset-0 bg-[#00000075] z-[1]"></div>
        <div className="absolute z-[2] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="flex items-center gap-2 justify-center text-center text-lg">
            <Link to="/">Trang chủ</Link>
            <MdKeyboardArrowRight />
            <Link
              to={
                belongsTo === "Cẩm nang"
                  ? path.HANDBOOK
                  : belongsTo === "Sống khỏe"
                  ? path.LONGLIVE
                  : path.TIP
              }
            >
              {belongsTo}
            </Link>
          </p>

          <div className="font-semibold text-2xl leading-10 mt-2">
            {article?.title}
          </div>
        </div>
      </div>

      <div className="container flex gap-10 mb-10 relative">
        <div className="w-[70%]">
          <div className="rounded-md shadow-md border p-6">
            {thumbnail ? (
              <StyledImage
                wrapperClasses="w-full aspect-[1.9] mb-8"
                src={arrayBufferToBase64(thumbnail)}
                alt={article?.title || ""}
                imageClasses="rounded-md"
              />
            ) : (
              <Skeleton
                count={1}
                className="w-full aspect-[1.9] rounded-md mb-8"
              />
            )}

            <h1 className="font-semibold text-[26px] leading-10 mb-5 text-main_color">
              {article?.title}
            </h1>

            <div className="text-sm py-6 space-y-3 border-y mb-6">
              <p>
                Sản phẩm của:{" "}
                <span className="font-semibold text-admin_main_color">
                  BookingCare
                </span>
              </p>
              <p>
                Tác giả:{" "}
                <span className="font-semibold text-admin_main_color">
                  {article?.User?.firstName} {article?.User?.lastName}
                </span>
              </p>
              <p>
                Xuất bản:{" "}
                <span className="font-semibold text-admin_main_color">
                  {moment(article?.createdAt).format("DD/MM/YYYY")}
                </span>{" "}
                | Cập nhật lần cuối:{" "}
                <span className="font-semibold text-admin_main_color">
                  {moment(article?.updatedAt).format("DD/MM/YYYY")}
                </span>
              </p>
            </div>

            <div className="font-semibold my-4 italic text-gray-700">
              {article?.description}
            </div>

            <div className="content prose prose-headings:!font-semibold prose-strong:font-semibold prose-h2:text-xl prose-h3:text-lg prose-headings:!text-title_text">
              {parse(article?.content || "")}
            </div>

            <div className="mt-8">
              <LikeAndShare
                href={`${process.env.REACT_APP_BASE_URL}${
                  belongsTo === "Cẩm nang"
                    ? path.HANDBOOK
                    : belongsTo === "Sống khỏe"
                    ? path.LONGLIVE
                    : path.TIP
                }/${article?.slug}`}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 sticky block top-14 max-h-screen">
          {article && <TOC selector=".content" />}
        </div>
      </div>

      <div className="my-10 page-container">
        <Comments
          href={`${process.env.REACT_APP_BASE_URL}${
            belongsTo === "Cẩm nang"
              ? path.HANDBOOK
              : belongsTo === "Sống khỏe"
              ? path.LONGLIVE
              : path.TIP
          }/${article?.slug}`}
        />
      </div>
    </div>
  );
};

export default ArticleContent;
