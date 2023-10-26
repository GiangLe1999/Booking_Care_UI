import { FC } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { GetAllUsersOutput } from "../../dtos/user.dto";
import UserAvatar from "../user-avatar";

interface Props {
  users: GetAllUsersOutput["users"];
}

const AllUsersTable: FC<Props> = ({ users }): JSX.Element => {
  return (
    <div>
      <div className="admin-table-wrapper">
        <table className="manage-user-table">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users?.map((user) => (
              <tr className="hover:bg-gray-50" key={user.id}>
                <th className="px-6 py-4 flex gap-3 text-gray-900">
                  <div className="relative h-10 w-10">
                    <UserAvatar
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{`${user.firstName} ${user.lastName}`}</div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </th>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>
                  <div className="flex gap-2">
                    {user.roleId === 1 ? (
                      <span className="manage-user-table-role bg-blue-50 text-blue-600">
                        Admin
                      </span>
                    ) : user.roleId === 2 ? (
                      <span className="manage-user-table-role bg-indigo-50 text-indigo-600">
                        Doctor
                      </span>
                    ) : (
                      <span className="manage-user-table-role bg-violet-50 text-violet-600">
                        Patient
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex gap-4">
                    <RiDeleteBin6Line
                      size={20}
                      className="cursor-pointer hover:text-admin_main_color"
                    />

                    <BiSolidEdit
                      size={20}
                      className="cursor-pointer hover:text-admin_main_color"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersTable;
