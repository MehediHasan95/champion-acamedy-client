import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useManageClasses from "../../hooks/useManageClasses";
import {
  faCircleCheck,
  faSpinner,
  faTrashAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SnackbarSuccess } from "../utilities/Snackbar";

function ManageClasses() {
  const [manageClasses, refetch, isLoading] = useManageClasses();
  const { user } = useAuth();
  const [instance] = useAxiosSecure();
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    instance
      .patch(`/manage-classes/${statusId}?uid=${user?.uid}`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.matchedCount > 0) {
          refetch();
          reset();
          setStatusId("");
          setStatus("");
          SnackbarSuccess("Feedback send success");
        }
      });
  };

  const handleDeleteClasses = (_id) => {
    instance.delete(`/manage-classes/${_id}?uid=${user?.uid}`).then((res) => {
      console.log(res.data);
      refetch();
    });
  };

  return (
    <div>
      <div className="overflow-x-auto p-3">
        <div className="my-3">
          <h1>Manage all classes</h1>
        </div>
        {!isLoading ? (
          <table className="table text-center">
            <thead className="bg-royalPurple text-white">
              <tr>
                <th>Class Image</th>
                <th>Class Name</th>
                <th>Instructor Name</th>
                <th>Instructor Email</th>
                <th>Available seats</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="border dark:border-base-300">
              {!isLoading &&
                manageClasses.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <img
                        src={e.image}
                        alt="image"
                        className="w-12 h-12 rounded-lg mx-auto"
                      />
                    </td>
                    <td>{e.courseName}</td>
                    <td>{e.instructorName}</td>
                    <td>{e.instructorEmail}</td>
                    <td>{e.seats}</td>
                    <td>${e.price}</td>
                    <th>
                      {e.status ? (
                        <button
                          className={`btn-xs uppercase ${
                            e.status === "approve"
                              ? "text-green-500"
                              : "text-amber-500"
                          }`}
                        >
                          {e.status}
                        </button>
                      ) : (
                        <button className="btn-xs text-red-500 uppercase">
                          Pending
                        </button>
                      )}
                    </th>
                    <td>
                      <button
                        onClick={() => {
                          setStatus("approve");
                          setStatusId(e._id);
                        }}
                        disabled={
                          e.status === "approve" ||
                          (e.status === "deny" && true)
                        }
                        className={`text-white uppercase mx-1 ${
                          e.status === "approve" || e.status === "deny"
                            ? "bg-gray-400"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        <label
                          htmlFor={
                            e.status === "approve" ||
                            e.status === "deny" ||
                            "action"
                          }
                          className="btn-xs inline-block"
                        >
                          Approve
                        </label>
                      </button>

                      <button
                        onClick={() => {
                          setStatus("deny");
                          setStatusId(e._id);
                        }}
                        disabled={
                          (e.status === "deny" || e.status === "approve") &&
                          true
                        }
                        className={`text-white uppercase mx-1 ${
                          e.status === "deny" || e.status === "approve"
                            ? "bg-gray-400"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        <label
                          htmlFor={
                            e.status === "approve" ||
                            e.status === "deny" ||
                            "action"
                          }
                          className="btn-xs inline-block"
                        >
                          Deny
                        </label>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteClasses(e._id)}
                        className="btn-xs bg-red-500 hover:bg-red-600 text-white mx-1"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
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
      <input type="checkbox" id="action" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box rounded-none">
          <div className="flex justify-end items-center">
            <label
              htmlFor="action"
              className="cursor-pointer w-6 h-6 rounded-full flex justify-center items-center bg-base-300"
            >
              <FontAwesomeIcon icon={faXmark} />
            </label>
          </div>
          {status && (
            <h3 className="font-bold text-lg text-center my-3">{`Are you sure you want to ${status} this class?`}</h3>
          )}
          <div className="py-4">
            {status ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  defaultValue={status}
                  readOnly
                  {...register("status", { required: true })}
                  className="w-full p-3 mb-2 border outline-none"
                  placeholder="Status"
                />
                {status === "deny" && (
                  <textarea
                    rows="5"
                    {...register("feedback", {
                      required: "This field is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{20,}$/g,
                        message: "At least 20 words should be written",
                      },
                    })}
                    className="w-full p-3 border outline-none"
                    placeholder={`Write the ${status} reason`}
                  />
                )}
                <p className="text-red-600 text-xs">
                  {errors.action && <span>{errors?.action?.message}</span>}
                </p>
                <button className="w-full p-2 mt-2 bg-royalPurple hover:bg-deepRoyalPurple text-white outline-none uppercase text-sm">
                  {status}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-5xl text-green-500 mb-2"
                />
                <p>Your status update Successfull</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageClasses;
