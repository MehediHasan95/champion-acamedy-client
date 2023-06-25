import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserList from "../../hooks/useUserList";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function UserList() {
  const [allUser, refetch, isLoading] = useUserList();
  const [roleChange, setRoleChange] = useState(false);
  console.log(allUser, isLoading);

  return (
    <div>
      <div className="overflow-x-auto border border-base-200">
        <table className="table text-center">
          <thead className="bg-royalPurple text-white">
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              allUser.map((e, index) => (
                <tr key={e._id}>
                  <th>{index + 1}</th>
                  <td>{e.displayName}</td>
                  <td>{e.email}</td>
                  <td className="uppercase">
                    {roleChange ? (
                      <select>
                        <option value="">Admin</option>
                        <option value="">Instructor</option>
                      </select>
                    ) : (
                      <>
                        {(e.role === "admin" && "Admin") ||
                          (e.role === "instructor" && "Instructor") ||
                          "User"}
                      </>
                    )}
                  </td>
                  <td className="flex justify-center space-x-5">
                    <button>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
