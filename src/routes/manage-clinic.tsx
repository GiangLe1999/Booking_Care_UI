import { FC } from "react";
import ProtectedPage from "../containers/protected-page";
import AdminProtectedPage from "../containers/admin-protected-page";
import { FormattedMessage } from "react-intl";

interface Props {}

const ManageClinic: FC<Props> = (props): JSX.Element => {
  return (
    <AdminProtectedPage>
      <div className="admin-page-container">
        <h1 className="admin-page-title">
          <FormattedMessage id="adminheader.admin.manage-doctor" />
        </h1>
      </div>
    </AdminProtectedPage>
  );
};

export default ManageClinic;
