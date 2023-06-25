import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserList from "../../hooks/useUserList";
import {
  faCheck,
  faEdit,
  faTrashAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";

function UserList() {
  const [allUser, refetch, isLoading] = useUserList();
  const [roleChange, setRoleChange] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
                    {e._id === roleChange ? (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <select
                          {...register("role", { required: true })}
                          className="p-1 border outline-none"
                        >
                          <option value="admin">Admin</option>
                          <option value="instructor">Instructor</option>
                        </select>
                        <button className="px-2 py-1 ms-1 bg-green-600 text-white border-none outline-none">
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          onClick={() => setRoleChange("")}
                          className="px-2 py-1 ms-1 bg-red-600 text-white border-none outline-none"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </form>
                    ) : (
                      e.role
                    )}
                  </td>
                  <td className="flex justify-center space-x-5">
                    {e._id === roleChange ? null : (
                      <button>
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => setRoleChange(e._id)}
                        />
                      </button>
                    )}

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
