import { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import Modal from "react-responsive-modal";
import parse from "html-react-parser";
import { formatVNDCurrency } from "../../utils/formatPrice";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import { ensuranceCompanyList } from "../../data/ensurance-company-list";

interface Props {
  clinicAddress: string;
  clinicName: string;
  priceTypeData: any;
  paymentTypeData: any;
  note: string;
}

const DoctorMainInfo: FC<Props> = ({
  clinicAddress,
  clinicName,
  priceTypeData,
  paymentTypeData,
  note,
}): JSX.Element => {
  const currentLanguage = useGetLanguage();
  const [showPriceDetail, setShowPriceDetail] = useState(false);
  const [showInsuranceDetail, setShowInsuranceDetail] = useState(false);
  const [showInsuranceList, setShowInsuranceList] = useState(false);

  return (
    <>
      <div className="pb-4 border-b">
        <h3 className="text-[#666] font-semibold">
          <FormattedMessage id="doctor-page.address" />
        </h3>
        <p className="text-black font-semibold text-[13px] mt-1 my-2">
          {clinicName}
        </p>
        <p className="text-xs">{clinicAddress}</p>
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
                formatVNDCurrency(priceTypeData?.valueVi)
              ) : (
                <>{priceTypeData?.valueEn}$</>
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
                  formatVNDCurrency(priceTypeData?.valueVi)
                ) : (
                  <>{priceTypeData?.valueEn}$</>
                )}
              </span>
            </div>

            <div className="text-xs text-[#666] leading-5 px-3 pb-3">
              {parse(note as string)}
            </div>

            <div className="bg-[#eee] px-3 py-2 text-xs">
              <FormattedMessage id="doctor-page.payment_method" />
              &nbsp;
              <span className="lowercase">
                {currentLanguage === "vi"
                  ? paymentTypeData?.valueVi
                  : paymentTypeData?.valueEn}
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
        className={`${!showInsuranceDetail && "flex items-center gap-4"} py-3`}
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

export default DoctorMainInfo;
