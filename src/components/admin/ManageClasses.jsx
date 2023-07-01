import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useManageClasses from "../../hooks/useManageClasses";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function ManageClasses() {
  const [manageClasses, refetch, isLoading] = useManageClasses();
  const { user } = useAuth();
  const [instance] = useAxiosSecure();
  const [status, setStatus] = useState("");

  const handleStatusUpdate = (_id) => {
    instance
      .patch(`/manage-classes/${_id}?uid=${user?.uid}`, { status })
      .then((res) => {
        console.log(res.data);
        refetch();
        setStatus("");
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
                        className="btn-xs bg-green-500 text-white mx-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setStatus("deny");
                          handleStatusUpdate(e._id);
                        }}
                        className="btn-xs bg-platinum text-white mx-1"
                      >
                        Deny
                      </button>
                      <button className="btn-xs bg-amber-500 text-white mx-1">
                        Feedback
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
    </div>
  );
}

export default ManageClasses;
