import { FC, useEffect, useState } from "react";
import RootLayout from "../containers/root-layout";
import { useLocation } from "react-router-dom";
import { bookingVerify } from "../service/patient.service";
import LoadingSpinner from "../components/loading-spinner";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";

interface Props {}

const VerifyBooking: FC<Props> = (props): JSX.Element => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") as string;
  const doctorId = searchParams.get("doctorId") as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const verifyHandler = async () => {
    setIsLoading(true);
    const data = await bookingVerify({ token, doctorId });

    if (!data.ok) {
      setIsLoading(false);
      return setIsSuccess(false);
    }

    setIsLoading(false);
    setIsSuccess(true);
  };

  useEffect(() => {
    verifyHandler();
  }, [token, doctorId]);

  return (
    <RootLayout>
      <div className="container h-[300px]">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            {isSuccess ? (
              <div>
                <p className="flex items-center justify-center gap-1 text-green-700 font-bold text-2xl">
                  Xác nhận lịch hẹn thành công <BsCheckCircleFill />
                </p>
                <p className="mt-2">
                  Mong bạn sẽ có mặt tại phòng khám đúng thời điểm đặt lịch
                </p>
              </div>
            ) : (
              <div>
                <p className="flex justify-center items-center gap-1 text-red-700 font-bold text-2xl">
                  Xác nhận thất bại <RiErrorWarningFill />
                </p>
                <p className="mt-2">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận{" "}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default VerifyBooking;
