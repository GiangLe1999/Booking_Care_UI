import { FC, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { GetAllUsersOutput } from "../../dtos/user.dto";
import UserAvatar from "../user-avatar";
import { deleteUser } from "../../service/user.service";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditUserForm from "./edit-user-form";
import { FormattedMessage } from "react-intl";
import { arrayBufferToBase64 } from "../../utils/bufferToBase64";

interface Props {
  users: GetAllUsersOutput["users"];
  fetchAllUsers: () => Promise<void>;
}

const AllUsersTable: FC<Props> = ({ users, fetchAllUsers }): JSX.Element => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedUserIndex, setEditedUserIndex] = useState<number | null>(null);
  const [editedUserId, setEditedUserId] = useState<number | null>(null);

  const deleteUserHandler = async (id: number) => {
    const res = await deleteUser(id);
    if (!res.ok) {
      toast.error(res.error);
    } else {
      toast.success("Delete user successfully");
      fetchAllUsers();
    }
  };

  return (
    <>
      <div className="admin-table-wrapper">
        <table className="manage-user-table">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">
                <FormattedMessage id="create-user-form.phone" />
              </th>
              <th scope="col">
                <FormattedMessage id="create-user-form.address" />
              </th>
              <th scope="col">
                <FormattedMessage id="create-user-form.role" />
              </th>
              <th scope="col">
                <FormattedMessage id="common.actions" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users?.map((user, index) => (
              <tr className="hover:bg-gray-50" key={user.id}>
                <th className="px-6 py-4 flex gap-3 text-gray-900">
                  <div className="relative h-10 w-10">
                    <UserAvatar
                      src={user.image ? arrayBufferToBase64(user.image) : ""}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700 line-clamp-1">{`${user.firstName} ${user.lastName}`}</div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </th>
                <td>{user.phoneNumber}</td>
                <td>
                  <span className="line-clamp-1">{user.address}</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {user.roleId === "R1" ? (
                      <span className="manage-user-table-role bg-blue-50 text-blue-600">
                        <FormattedMessage id="role.admin" />
                      </span>
                    ) : user.roleId === "R2" ? (
                      <span className="manage-user-table-role bg-indigo-50 text-indigo-600">
                        <FormattedMessage id="role.doctor" />
                      </span>
                    ) : (
                      <span className="manage-user-table-role bg-violet-50 text-violet-600">
                        <FormattedMessage id="role.patient" />
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex gap-4">
                    <RiDeleteBin6Line
                      size={20}
                      className="cursor-pointer hover:text-admin_main_color"
                      onClick={() => deleteUserHandler(user.id)}
                    />

                    <BiSolidEdit
                      size={20}
                      className="cursor-pointer hover:text-admin_main_color"
                      onClick={() => {
                        setOpenEditModal(true);
                        setEditedUserIndex(index);
                        setEditedUserId(user.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        center
      >
        <EditUserForm
          setOpenEditModal={setOpenEditModal}
          fetchAllUsers={fetchAllUsers}
          editedUser={users?.[editedUserIndex as number]}
          editedUserId={editedUserId}
        />
      </Modal>
    </>
  );
};

export default AllUsersTable;
