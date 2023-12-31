import { Zoom } from "react-awesome-reveal";
import useAllInstructor from "../../hooks/useAllInstructor";
import useTitle from "../../hooks/useTitle";
import { noData } from "../utilities/utils";

function AllInstructor() {
  useTitle("All Instructor");
  const [allInstructor] = useAllInstructor();

  return (
    <div className="min-h-100 max-w-screen-2xl mx-auto my-20">
      {allInstructor?.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {allInstructor?.map((e) => (
            <Zoom key={e._id}>
              <div className="col-span-1 flex bg-base-200">
                <div className="w-80 h-64">
                  <img
                    src={e.photoURL}
                    alt="instructor_profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full grid place-items-center">
                  <div>
                    <h1 className="text-xl text-royalPurple font-semibold">
                      {e.displayName}
                    </h1>
                    <p className="italic uppercase text-xs">{e.role}</p>
                  </div>
                </div>
              </div>
            </Zoom>
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
