import { FC, useEffect, useRef, useState } from "react";
import { DetailedClinic } from "../dtos/clinic.dto";
import { getClinic } from "../service/clinic.service";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import StyledImage from "../components/styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { getDoctorsByClinic } from "../service/doctor.service";
import DoctorCard from "../components/doctor-card";

interface Props {}

const Clinic: FC<Props> = (props): JSX.Element => {
  const [headings, setHeadings] = useState<HTMLHeadElement[]>([]);

  const [currentHeadingID, setCurrentHeadingID] = useState<
    string | undefined
  >();

  const listWrapperRef = useRef<HTMLUListElement>(null);

  const { id } = useParams();

  const [clinicImage, setClinicImage] = useState("");
  const [clinicDescription, setClinicDescription] = useState("");
  const [clinicLogo, setClinicLogo] = useState("");

  const [clinic, setClinic] = useState<DetailedClinic>();
  const [clinicDoctors, setClinicDoctors] = useState<any>();

  const fetchClinic = async () => {
    const res = await getClinic(id as string);

    if (res.ok && res.clinic) {
      setClinic(res.clinic);
    }
  };

  const fetchClinicDoctors = async () => {
    const res = await getDoctorsByClinic(id as string);

    if (res.ok && res.doctors) {
      setClinicDoctors(res.doctors);
    }
  };

  console.log(clinicDoctors);

  const fetchData = () => {
    Promise.all([fetchClinic(), fetchClinicDoctors()]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (clinic?.image) {
      setClinicImage(arrayBufferToBase64(clinic?.image));
    }

    if (clinic?.description) {
      setClinicDescription(clinic?.description);
    }

    if (clinic?.logo) {
      setClinicLogo(arrayBufferToBase64(clinic?.logo));
    }
  }, [clinic]);

  useEffect(() => {
    // Select tất cả h2 nằm trong class selector = content
    const headingList = document
      .querySelector(".content")!
      .querySelectorAll("h2") as NodeListOf<HTMLHeadElement>;

    // Gắn data-id vào cho các thẻ heading
    const headingArray = Array.from(headingList);
    headingArray.forEach((heading) => {
      heading.dataset.id = Math.round(Math.random() * 100000).toString();
    });

    setHeadings(headingArray);
  }, [clinicDescription]);

  // Tìm currentHeading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            setCurrentHeadingID((entry.target as HTMLHeadElement).dataset.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%", threshold: 1 }
    );

    if (headings.length) {
      headings.forEach((heading) => {
        observer.observe(heading);
      });
    }
  }, [headings.length, headings]);

  // List tự động scroll dựa theo currentHeadingID
  useEffect(() => {
    const currentListItem = listWrapperRef.current?.querySelector(
      `li[data-id='${currentHeadingID}']`
    );

    if (currentListItem && currentHeadingID) {
      listWrapperRef.current?.scrollTo({
        top: (currentListItem as HTMLElement).offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentHeadingID]);

  return (
    <>
      <RootHeader />
      <div className="">
        <StyledImage
          src={clinicImage}
          alt={clinic?.name || ""}
          wrapperClasses="w-full aspect-[2.41]"
        />
      </div>

      <div className="container">
        <div className="relative rounded-t -mt-20 bg-[#ffffffcc] pt-5 pb-5 z-0 shadow-[rgba(32,33,36,0.28)_0px_1px_6px]">
          <div className="flex items-center mx-6 gap-4">
            <div className="bg-white w-[112px] h-[112px] rounded shadow-md">
              <StyledImage
                src={clinicLogo}
                alt={clinic?.name || ""}
                wrapperClasses="w-full h-full"
                imageClasses="!object-contain"
              />
            </div>

            <div className="">
              <h1 className="font-semibold text-3xl mb-2">
                {clinic?.name || ""}
              </h1>
              <address className="not-italic">{clinic?.address || ""}</address>
            </div>
          </div>
        </div>

        <div className="sticky -mt-1 -top-1 bg-white shadow-[0px_5px_6px_rgba(32,33,36,0.28)] z-1">
          <ul
            ref={listWrapperRef}
            className="flex items-center justify-center gap-10 px-3 py-2 z-50"
          >
            {headings.map((heading) => (
              <li
                className={`font-semibold uppercase text-normal_text py-1 cursor-pointer ${
                  currentHeadingID === heading.dataset.id
                    ? "text-yellow underline"
                    : ""
                }`}
                data-id={heading.dataset.id}
                key={heading.dataset.id}
                onClick={() => {
                  window.scrollTo({
                    top:
                      heading.getBoundingClientRect().top +
                      window.scrollY -
                      100,
                    behavior: "smooth",
                  });
                }}
              >
                {heading.innerHTML}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#ffecb2] py-[10px] px-5 rounded mt-5">
          BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt
          Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn
          1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế
          chất lượng cao.
        </div>

        <div className="bg-[#d4effc] p-5 rounded my-5">
          Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu,
          Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám BookingCare.
          <ul className="ml-10 list-disc mt-3">
            <li>
              Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh
              nghiệm
            </li>
            <li>
              Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch){" "}
            </li>
            <li>
              Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước
            </li>
            <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
          </ul>
        </div>

        {clinicDoctors?.length > 0 && (
          <div className="mb-14">
            <h2 className="text-[#337ab7] text-lg font-bold mt-10 mb-4 uppercase">
              Đặt khám
            </h2>
            <div className="space-y-3">
              {clinicDoctors?.map((doctor: any) => (
                <DoctorCard doctor={doctor} key={doctor?.User?.id} />
              ))}
            </div>
          </div>
        )}

        <div className="content clinic-content">{parse(clinicDescription)}</div>
      </div>

      <RootFooter />
    </>
  );
};

export default Clinic;
