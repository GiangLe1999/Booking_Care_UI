import { FC, useEffect, useState } from "react";
import ProtectedPage from "../containers/protected-page";
import AllUsersTable from "../components/manage-user/all-users-table";
import { getAllUsers } from "../service/user.service";
import { GetAllUsersOutput } from "../dtos/user.dto";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BtnWithIcon from "../components/btn-with-icon";
import { FaPlus } from "react-icons/fa";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import CreateUserForm from "../components/manage-user/create-user-form";
import TextEditor from "../components/text-editor";
import { FormattedMessage } from "react-intl";

interface Props {}

const ManageUser: FC<Props> = (props): JSX.Element => {
  const [users, setUsers] = useState<GetAllUsersOutput["users"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchAllUsers = async () => {
    setIsLoading(true);
    const res = (await getAllUsers()) as GetAllUsersOutput;
    setUsers(res.users?.reverse());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <ProtectedPage>
      <div className="admin-page-container">
        {isLoading ? (
          <div>
            <div className="text-center mb-4">
              <Skeleton count={1} width={300} height={40} />
            </div>
            <Skeleton count={5} height={50} />
          </div>
        ) : (
          <>
            <h1 className="admin-page-title">
              <FormattedMessage id="adminheader.admin.manage-general-user" />
            </h1>
            <div className="text-right mt-3">
              <BtnWithIcon
                content="add-user"
                icon={FaPlus}
                iconSize={13}
                iconCustomClasses="-mt-[1px]"
                customClasses="admin-btn"
                onClick={() => setOpenCreateModal(true)}
              />
            </div>
            <AllUsersTable users={users} fetchAllUsers={fetchAllUsers} />

            <Modal
              open={openCreateModal}
              onClose={() => setOpenCreateModal(false)}
              center
            >
              <CreateUserForm
                setOpenCreateModal={setOpenCreateModal}
                fetchAllUsers={fetchAllUsers}
              />
            </Modal>
          </>
        )}
      </div>
    </ProtectedPage>
  );
};

export default ManageUser;
