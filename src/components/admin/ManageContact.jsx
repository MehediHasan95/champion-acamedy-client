import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useContact from "../../hooks/useContact";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageContact = () => {
  const [allcontacts, refetch, isLoading, user] = useContact();
  const [instance] = useAxiosSecure();

  const handleDeleteContact = (id) => {
    instance.delete(`/contact/${id}?uid=${user?.uid}`).then(() => refetch());
  };
  return (
    <div className="p-3">
      <div className="my-3">
        <h1 className="text-center uppercase">
          Manage all contacts information
        </h1>
      </div>
      {allcontacts?.length === 0 && <p>No contact message found!</p>}
      <div className="grid gap-3 lg:grid-cols-3">
        {!isLoading &&
          allcontacts.map(({ _id, name, email, subject, message }) => (
            <div key={_id} className="p-3 border">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">{name}</h1>
                <button onClick={() => handleDeleteContact(_id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
              <p className="text-sm mb-5">Email: {email}</p>
              <p className="my-5">
                <span className="underline">Subject:</span> {subject}
              </p>
              <p>{message}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageContact;
