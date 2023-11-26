import { FC } from "react";
import { createArticleProcessItem } from "../data/menu";
import StyledImage from "./styled-image";

interface Props {}

const CreateArticleProcess: FC<Props> = (props): JSX.Element => {
  return (
    <div className="container mt-16 mb-10">
      <h3 className="font-semibold mt-10 mb-3 text-2xl">
        BookingCare tạo ra nội dung như thế nào?
      </h3>

      <div className="bg-[#d4effc] grid grid-cols-4 rounded-md pt-12">
        {createArticleProcessItem.map((item, index) => (
          <div key={index}>
            <StyledImage
              src={`/assets/images/quy-trinh/buoc-${index + 1}.png`}
              alt=""
              wrapperClasses="w-[60%] h-[60%] mx-auto"
              imageClasses="!object-contain"
            />

            <h5 className="font-semibold text-lg text-center mx-auto w-[70%] mt-4">
              {item}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateArticleProcess;
