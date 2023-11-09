import { FC, useEffect, useState } from "react";
import { getDoctor } from "../service/doctor.service";
import { DetailedDoctor } from "../dtos/doctor.dto";
import { useParams } from "react-router-dom";
import StyledImage from "../components/styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import parse from "html-react-parser";
import DoctorSchedule from "../components/doctor-page/doctor-schedule";
import RootFooter from "../components/layout/root-footer";
import SubHeader from "../components/layout/sub-header";
import { FormattedMessage } from "react-intl";
import { useGetLanguage } from "../hooks/useGetLanguage";
import { formatVNDCurrency } from "../utils/formatPrice";
import Modal from "react-responsive-modal";
import { ensuranceCompanyList } from "../data/ensurance-company-list";

interface Props {}

const Doctor: FC<Props> = (props): JSX.Element => {
  const currentLanguage = useGetLanguage();
  const { id } = useParams();
  const [doctor, setDoctor] = useState<DetailedDoctor>();
  const [isLoading, setIsLoading] = useState(false);
  const [doctorImage, setDoctorImage] = useState("");
  const [doctorDescription, setDoctorDescription] = useState("");
  const [doctorContent, setDoctorContent] = useState("");
  const [showHeading, setShowHeading] = useState(false);
  const [showPriceDetail, setShowPriceDetail] = useState(false);
  const [showInsuranceDetail, setShowInsuranceDetail] = useState(false);
  const [showInsuranceList, setShowInsuranceList] = useState(false);

  const fetchDoctor = async () => {
    setIsLoading(true);
    const res = await getDoctor(id as string);

    if (res.ok && res.doctor) {
      setDoctor(res.doctor);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  useEffect(() => {
    if (doctor?.image) {
      setDoctorImage(arrayBufferToBase64(doctor?.image));
    }

    if (doctor?.Content.description) {
      setDoctorDescription(doctor?.Content.description);
    }

    if (doctor?.Content.content) {
      setDoctorContent(doctor?.Content.content);
    }
  }, [doctor]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 80) {
        setShowHeading(true);
      } else {
        setShowHeading(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) return <p>Loading</p>;

  return (
    <>
      <SubHeader
        headingContent={
          showHeading ? document.getElementsByTagName("h1")[0]?.innerText : ""
        }
      />
      <div className="container mt-24">
        <div className="flex items-center gap-3">
          <StyledImage
            wrapperClasses="w-[120px] aspect-square rounded-full overflow-hidden shadow-md"
            src={doctorImage}
            alt={`Bác sĩ ${doctor?.firstName} ${doctor?.lastName}`}
          />

          <div className="doctor-description">{parse(doctorDescription)}</div>
        </div>
      </div>

      <div className="my-10 container flex gap-10">
        <div className="w-[55%]">
          <DoctorSchedule
            doctorId={doctor?.id as number}
            doctorName={`${doctor?.firstName} ${doctor?.lastName}`}
            doctorImg={doctorImage}
            doctorPosition={doctor?.positionData?.valueVi}
            doctorPrice={doctor?.Doctor_Info.priceTypeData.valueVi}
          />
        </div>

        <div className="border-l pl-4 text-[15px] pb-4 w-[40%]">
          <div className="pb-4 border-b">
            <h3 className="text-[#666] font-semibold">
              <FormattedMessage id="doctor-page.address" />
            </h3>
            <p className="text-black font-semibold text-[13px] mt-1 my-2">
              {doctor?.Doctor_Info?.clinicName}
            </p>
            <p className="text-xs">{doctor?.Doctor_Info?.clinicAddress}</p>
          </div>

          <div
            className={`py-3 border-b ${
              !showPriceDetail && "flex items-center gap-5"
            }`}
          >
            <h3 className="text-[#666] font-semibold flex items-center gap-1">
              <span className="uppercase">
                <FormattedMessage id="doctor-page.price" />:
              </span>
              {!showPriceDetail && (
                <span className="font-normal text-black">
                  {currentLanguage === "vi" ? (
                    formatVNDCurrency(
                      doctor?.Doctor_Info?.priceTypeData?.valueVi
                    )
                  ) : (
                    <>{doctor?.Doctor_Info?.priceTypeData?.valueEn}$</>
                  )}
                </span>
              )}
            </h3>

            {showPriceDetail && (
              <div className="border shadow rounded-sm bg-[#f8f8f8] my-3">
                <div className="flex items-center justify-between mb-1 pt-3 px-3">
                  <FormattedMessage id="doctor-page.price" />
                  <span className="font-normal text-black relative">
                    {currentLanguage === "vi" ? (
                      formatVNDCurrency(
                        doctor?.Doctor_Info?.priceTypeData?.valueVi
                      )
                    ) : (
                      <>{doctor?.Doctor_Info?.priceTypeData?.valueEn}$</>
                    )}
                  </span>
                </div>

                <div className="text-xs text-[#666] leading-5 px-3 pb-3">
                  {parse(doctor?.Doctor_Info?.note as string)}
                </div>

                <div className="bg-[#eee] px-3 py-2 text-xs">
                  <FormattedMessage id="doctor-page.payment_method" />
                  &nbsp;
                  <span className="lowercase">
                    {currentLanguage === "vi"
                      ? doctor?.Doctor_Info.paymentTypeData.valueVi
                      : doctor?.Doctor_Info.paymentTypeData.valueEn}
                  </span>
                </div>
              </div>
            )}

            <button
              className="text-main_color text-sm"
              onClick={() => setShowPriceDetail((prev) => !prev)}
            >
              {!showPriceDetail ? (
                <FormattedMessage id="doctor-page.see_detail" />
              ) : (
                <FormattedMessage id="doctor-page.hide_price" />
              )}
            </button>
          </div>

          <div
            className={`${
              !showInsuranceDetail && "flex items-center gap-4"
            } py-3`}
          >
            <h3 className="text-[#666] font-semibold">
              <FormattedMessage id="doctor-page.insurance" />
            </h3>

            {showInsuranceDetail && (
              <div className="border shadow rounded-sm bg-[#f8f8f8] my-3">
                <p className="text-sm mb-1 px-3 pt-3">
                  <FormattedMessage id="doctor-page.nation_insurance" />
                </p>
                <p className="text-xs text-[#666] px-3 pb-3 border-b">
                  <FormattedMessage id="doctor-page.nation_insurance_detail" />
                </p>

                <p className="text-sm mb-1 px-3 pt-3">
                  <FormattedMessage id="doctor-page.private_insurance" />
                </p>
                <p className="text-xs text-[#666] px-3 pb-1">
                  <FormattedMessage id="doctor-page.private_insurance_detail" />
                </p>

                <button
                  className="text-main_color px-3 pb-3 text-xs"
                  onClick={() => setShowInsuranceList(true)}
                >
                  <FormattedMessage id="doctor-page.watch_list" />
                </button>
              </div>
            )}

            <button
              className="text-main_color text-sm"
              onClick={() => setShowInsuranceDetail((prev) => !prev)}
            >
              {!showInsuranceDetail ? (
                <FormattedMessage id="doctor-page.see_detail" />
              ) : (
                <FormattedMessage id="doctor-page.minimize" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="border-y bg-[#f9f9f9] pb-4">
        <div className="doctor-content">{parse(doctorContent)}</div>
      </div>
      <RootFooter />

      <Modal
        open={showInsuranceList}
        onClose={() => setShowInsuranceList(false)}
        center
        classNames={{ modal: "ensurance-list-modal" }}
      >
        <h3 className="bg-main_color text-white py-4 pl-6 text-lg font-bold">
          <FormattedMessage id="doctor-page.list_title" />
        </h3>

        <div className="bg-[#ffc] p-4">
          <table className="w-full text-sm">
            {ensuranceCompanyList.map((company, index) => (
              <tr key={index}>
                <td className="border border-[#ddd] text-center w-[60px] py-2">
                  {index + 1}
                </td>
                <td className="border border-[#ddd] pl-4">{company}</td>
              </tr>
            ))}
          </table>
        </div>
      </Modal>
    </>
  );
};

export default Doctor;
