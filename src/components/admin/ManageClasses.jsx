import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useManageClasses from "../../hooks/useManageClasses";
import {
  faCircleCheck,
  faCircleXmark,
  faSpinner,
  faTrashAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SnackbarSuccess } from "../utilities/Snackbar";
import useTitle from "../../hooks/useTitle";

function ManageClasses() {
  useTitle("Manage Classes");
  const [manageClasses, refetch, isLoading] = useManageClasses();
  const { user } = useAuth();
  const [instance] = useAxiosSecure();
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState("");

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    const status = e?.target?.status?.value;
    const feedback = e?.target?.feedback?.value;
    const data = { status, feedback: feedback || null };
    instance
      .patch(`/manage-classes/${statusId}?uid=${user?.uid}`, data)
      .then((res) => {
        if (res.data.matchedCount > 0) {
          refetch();
          setStatusId("");
          setStatus("");
          SnackbarSuccess("Feedback send success");
        }
      });
  };

  const handleDeleteClasses = (_id) => {
    instance.delete(`/manage-classes/${_id}?uid=${user?.uid}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        SnackbarSuccess("Class delete successfull");
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto p-3">
        <div className="my-3">
          <h1 className="text-center uppercase">
            Manage all classes information
          </h1>
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
                        className={`text-white btn-xs uppercase mx-1 ${
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
                        >
                          <FontAwesomeIcon icon={faCircleCheck} /> Approve
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
                        className={`text-white btn-xs uppercase mx-1 ${
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
                        >
                          <FontAwesomeIcon icon={faCircleXmark} /> Deny
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
              onClick={() => setStatus("")}
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
              <form onSubmit={handleUpdateStatus}>
                <input
                  type="text"
                  name="status"
                  defaultValue={status}
                  readOnly
                  className="w-full p-3 mb-2 border outline-none uppercase"
                  placeholder="Status"
                  required
                />
                {status === "deny" && (
                  <textarea
                    rows="5"
                    name="feedback"
                    className="w-full p-3 mb-2 border outline-none"
                    placeholder={`Write the ${status} reason`}
                    required
                  />
                )}

                <button className="w-full p-2 bg-royalPurple hover:bg-deepRoyalPurple text-white outline-none uppercase text-sm">
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
