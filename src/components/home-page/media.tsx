import { FC } from "react";
import { mediaItems } from "../../data/menu";
import StyledImage from "../styled-image";

interface Props {}

const Media: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <div className="container">
        <h3 className="text-center font-semibold text-2xl mb-5">
          Truyền thông nói về BookingCare
        </h3>

        <div className="grid grid-cols-2 gap-8">
          <iframe
            className="w-full aspect-video rounded-md"
            src="https://www.youtube.com/embed/FyDQljKtWnI"
            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          <div className="grid grid-cols-2 gap-4">
            {mediaItems.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="grid place-items-center py-2 px-3 bg-white rounded-md"
              >
                <StyledImage
                  wrapperClasses="w-[133px] h-[39px]"
                  alt={item.logo}
                  src={`/assets/images/home-page/${item.logo}.png`}
                  imageClasses="!object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
