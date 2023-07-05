import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMyClasses from "../../hooks/useMyClasses";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { SnackbarSuccess } from "../utilities/Snackbar";

function MyClass() {
  const [myClasses, refetch, isLoading] = useMyClasses();
  const { user } = useAuth();
  const [instance] = useAxiosSecure();
  const [update, setUpdate] = useState({});

  const handleEditClasses = (_id) => {
    instance.get(`/manage-classes/${_id}?uid=${user?.uid}`).then((res) => {
      setUpdate(res.data);
    });
  };

  const handleUpdateClasses = (e) => {
    e.preventDefault();
    const courseName = e.target.courseName.value;
    const price = parseFloat(e.target.price.value);
    const seats = parseInt(e.target.seats.value);
    const image = e.target.image.value;
    const data = { courseName, price, seats, image };
    instance
      .patch(`/manage-classes/${update._id}?uid=${user?.uid}`, data)
      .then((res) => {
        if (res.data.matchedCount > 0) {
          refetch();
          SnackbarSuccess("Class update successfull");
        }
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead className="bg-royalPurple text-white">
            <tr>
              <th>SL</th>
              <th>Create</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Total Enroll</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border dark:border-base-300">
            {!isLoading &&
              myClasses.map((e, index) => (
                <tr key={e._id}>
                  <td>{index + 1}</td>
                  <th>{e.create}</th>
                  <td>{e.courseName}</td>
                  <td>${e.price}</td>
                  <td>
                    {e.seats}
                    <small className="ms-1">Available</small>
                  </td>
                  <td>
                    {e.enroll ? e.enroll : 0}
                    <small className="ms-1">(Students)</small>
                  </td>
                  <td>{e.feedback ? e.feedback : "No Feedback"}</td>
                  <td>
                    {e.status ? (
                      <button
                        className={`btn-xs uppercase text-white ${
                          e.status === "approve"
                            ? "bg-green-500"
                            : "bg-amber-500"
                        }`}
                      >
                        {e.status}
                      </button>
                    ) : (
                      <button className="btn-xs bg-platinum text-white uppercase">
                        Pending
                      </button>
                    )}
                  </td>
                  <td>
                    <label htmlFor="editMyClasses" className="cursor-pointer">
                      <FontAwesomeIcon
                        onClick={() => handleEditClasses(e._id)}
                        icon={faEdit}
                        className="hover:text-royalPurple"
                      />
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <input type="checkbox" id="editMyClasses" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box rounded-none">
          <label
            htmlFor="editMyClasses"
            className="text-right inline-block w-full cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="bg-base-300 w-6 h-6 rounded-full"
            />
          </label>
          <h3 className="font-bold text-lg">
            Please update your class information
          </h3>
          <div className="py-4">
            <form onSubmit={handleUpdateClasses}>
              <input
                type="text"
                name="courseName"
                defaultValue={update.courseName}
                className="w-full p-3 mb-2 border outline-none"
                placeholder="Class name"
                required
              />
              <input
                type="text"
                name="price"
                defaultValue={update.price}
                className="w-full p-3 mb-2 border outline-none"
                placeholder="Price"
                required
              />
              <input
                type="text"
                name="seats"
                defaultValue={update.seats}
                className="w-full p-3 mb-2 border outline-none"
                placeholder="Seats"
                required
              />
              <input
                type="text"
                name="image"
                defaultValue={update.image}
                className="w-full p-3 mb-2 border outline-none"
                placeholder="Image"
                required
              />
              <button className="w-full p-3 bg-royalPurple text-white uppercase text-sm">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyClass;
