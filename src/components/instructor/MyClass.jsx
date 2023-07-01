import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMyClasses from "../../hooks/useMyClasses";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

function MyClass() {
  const [myClasses, refetch, isLoading] = useMyClasses();
  console.log(myClasses);

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
                  <td>
                    <button className="text-royalPurple">
                      <FontAwesomeIcon icon={faCommentDots} />
                    </button>
                  </td>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyClass;
