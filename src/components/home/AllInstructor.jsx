import useAllInstructor from "../../hooks/useAllInstructor";
import { noData } from "../utilities/utils";

function AllInstructor() {
  const [allInstructor] = useAllInstructor();

  return (
    <div className="min-h-75 max-w-screen-2xl mx-auto my-10">
      {allInstructor?.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {allInstructor?.map((e) => (
            <div key={e._id} className="col-span-1 flex bg-base-200">
              <div className="w-48 h-64">
                <img
                  src={e.photoURL}
                  alt="instructor_profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 my-auto mx-auto">
                <h1 className="text-xl text-royalPurple font-semibold">
                  {e.displayName}
                </h1>
                <p className="italic">{e.email}</p>
                <p className="italic uppercase text-xs">{e.role}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-75 grid place-items-center">
          <img src={noData} alt="no_data" className="w-3/6" />
        </div>
      )}
    </div>
  );
}

export default AllInstructor;
