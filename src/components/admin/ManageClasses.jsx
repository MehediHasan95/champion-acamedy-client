import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useManageClasses from "../../hooks/useManageClasses";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SnackbarSuccess } from "../utilities/Snackbar";

function ManageClasses() {
  const [manageClasses, refetch, isLoading] = useManageClasses();
  const { user } = useAuth();
  const [instance] = useAxiosSecure();
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleStatusUpdate = (_id) => {};

  const onSubmit = (data) => {
    instance
      .patch(`/manage-classes/${feedback._id}?uid=${user?.uid}`, data)
      .then((res) => {
        if (res.data.matchedCount > 0) {
          refetch();
          reset();
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
                      <button className="btn-xs uppercase">
                        {e.status ? e.status : "Pending"}
                      </button>
                    </th>
                    <td>
                      <button
                        onClick={() => {
                          setStatus("approve");
                          handleStatusUpdate(e._id);
                        }}
                        className="btn-xs bg-green-500 hover:bg-green-600 text-white mx-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setStatus("deny");
                          handleStatusUpdate(e._id);
                        }}
                        className="btn-xs bg-red-500 hover:bg-red-600 text-white mx-1"
                      >
                        Deny
                      </button>
                      <button
                        onClick={() => setFeedback(e)}
                        className="btn-xs bg-amber-500 hover:bg-amber-600 text-white mx-1"
                      >
                        <label htmlFor="feedback">Feedback</label>
                      </button>
                      <button
                        onClick={() => handleDeleteClasses(e._id)}
                        className="btn-xs bg-red-500 hover:bg-red-600 text-white mx-1"
                      >
                        Delete
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
      <input type="checkbox" id="feedback" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box rounded-none">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">
              Feedback: {feedback.courseName}
            </h3>
            <label
              htmlFor="feedback"
              className="cursor-pointer w-8 h-8 rounded-full flex justify-center items-center bg-base-300"
            >
              <FontAwesomeIcon icon={faXmark} />
            </label>
          </div>
          <div className="py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                rows="5"
                {...register("feedback", {
                  required: "This field is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{60,}$/g,
                    message:
                      "Feedback should contain only alphanumeric characters and 60 characters",
                  },
                })}
                className="w-full p-3 border outline-none"
                placeholder="Type here..."
              />
              <p className="text-red-600 text-xs">
                {errors.feedback && <span>{errors?.feedback?.message}</span>}
              </p>
              <button className="w-full p-3 mt-2 bg-royalPurple text-white outline-none uppercase">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageClasses;
