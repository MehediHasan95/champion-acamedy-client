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
import axios from "axios";
import { enqueueSnackbar } from "notistack";

function ManageUsers() {
  const [allUser, refetch, isLoading] = useUserList();
  const [roleChange, setRoleChange] = useState("");

  const { register, reset, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .patch(`http://localhost:5000/users/${roleChange}`, data)
      .then((res) => {
        if (res.data.acknowledged) {
          refetch();
          setRoleChange("");
          reset();
          enqueueSnackbar("Role change successful", {
            variant: "success",
            autoHideDuration: 3000,
          });
        }
      });
  };

  const handleDeleteUser = (e) => {
    axios
      .delete(`http://localhost:5000/users?id=${e._id}&uid=${e.uid}`)
      .then((res) => {
        const { message } = res.data;
        refetch();
        enqueueSnackbar(message || "User has been deleted successfully", {
          variant: message ? "error" : "success",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <div>
      <div className="overflow-x-auto p-3">
        <div className="my-3">
          <h1>Manage all users information</h1>
        </div>
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
          <tbody className="border">
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
                          defaultValue={null}
                        >
                          <option selected disabled>
                            Select role
                          </option>
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
                  <td className="flex justify-center space-x-3">
                    {e._id === roleChange ? null : (
                      <>
                        {e.role !== "student" ? null : (
                          <button
                            onClick={() => setRoleChange(e._id)}
                            className="bg-yellow-400 text-white px-2 py-1 tooltip"
                            data-tip="Edit"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        )}
                      </>
                    )}

                    <button
                      onClick={() => handleDeleteUser(e)}
                      className="bg-platinum text-white px-2 py-1 tooltip"
                      data-tip="Delete"
                    >
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

export default ManageUsers;