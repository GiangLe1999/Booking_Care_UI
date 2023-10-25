import { FC } from "react";
import ProtectedPage from "../containers/protected-page";

interface Props {}

const ManageUser: FC<Props> = (props): JSX.Element => {
  return (
    <ProtectedPage>
      <div className="my-14">ManageUser</div>
    </ProtectedPage>
  );
};

export default ManageUser;
