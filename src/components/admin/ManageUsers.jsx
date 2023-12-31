import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserList from "../../hooks/useUserList";
import {
  faCheck,
  faEdit,
  faSpinner,
  faTrashAlt,
  faUserShield,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Bounce } from "react-awesome-reveal";
import useTitle from "../../hooks/useTitle";

function ManageUsers() {
  useTitle("Manage Users");
  const [allUser, refetch, isLoading] = useUserList();
  const [roleChange, setRoleChange] = useState("");
  const [loader, setLoader] = useState(false);
  const [deleteUser, setDeleteUser] = useState("");
  const { register, reset, handleSubmit } = useForm();
  const [instance] = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = (data) => {
    instance
      .patch(`/users/${roleChange}?uid=${user?.uid}`, data)
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
    setLoader(true);
    setDeleteUser(e._id);
    instance
      .delete(`/users?uid=${user?.uid}&id=${e._id}&did=${e.uid}`)
      .then((res) => {
        const { message } = res.data;
        refetch();
        setDeleteUser("");
        setLoader(false);
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
          <h1 className="text-center uppercase">
            Manage all users information
          </h1>
        </div>
        {!isLoading ? (
          <table className="table text-center">
            <thead className="bg-royalPurple text-white">
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>Create</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="border dark:border-base-300">
              {!isLoading &&
                allUser.map((e, index) => (
                  <tr key={e._id}>
                    <td>{index + 1}</td>
                    <td>{e.displayName}</td>
                    <td>{e.email}</td>
                    <td>{e.create}</td>
                    <td className="uppercase">
                      {e._id === roleChange ? (
                        <Bounce>
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
                            <button className="px-2 py-1 ms-1 bg-green-500 text-white border-none outline-none">
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              onClick={() => setRoleChange("")}
                              className="px-2 py-1 ms-1 bg-platinum text-white border-none outline-none"
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                          </form>
                        </Bounce>
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

                      {e.role === "admin" ? (
                        <FontAwesomeIcon
                          icon={faUserShield}
                          className="text-royalPurple"
                        />
                      ) : (
                        <button
                          onClick={() => handleDeleteUser(e)}
                          className="bg-platinum text-white px-2 py-1 tooltip"
                          data-tip="Delete"
                        >
                          {deleteUser === e._id ? (
                            <>
                              {loader ? (
                                <FontAwesomeIcon
                                  icon={faSpinner}
                                  className="animate-spin"
                                />
                              ) : (
                                <FontAwesomeIcon icon={faTrashAlt} />
                              )}
                            </>
                          ) : (
                            <FontAwesomeIcon icon={faTrashAlt} />
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center my-10 animate-spin">
            <FontAwesomeIcon icon={faSpinner} />
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
