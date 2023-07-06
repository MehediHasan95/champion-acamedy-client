import { Bounce } from "react-awesome-reveal";
import useAllInstructor from "../../hooks/useAllInstructor";

function PopularInstructors() {
  const [allInstructor] = useAllInstructor();

  return (
    <div className="max-w-screen-2xl mx-auto my-32 px-3">
      <h1 className="text-center text-5xl font-bold my-20">
        Popular <span className="text-royalPurple">Instructors</span>
      </h1>
      {allInstructor.length > 0 ? (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
          {allInstructor?.slice(0, 6).map((e) => (
            <Bounce key={e._id}>
              <div className="bg-base-200 relative">
                <div className="h-96">
                  <img
                    src={e.photoURL}
                    alt="instructor_image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-center bg-royalPurple bg-opacity-50 py-3 text-xl font-lobster absolute bottom-0 left-0 right-0 text-white">
                  {e.displayName}
                </h1>
              </div>
            </Bounce>
          ))}
        </div>
      ) : (
        <p className="text-center">Instructor data not found</p>
      )}
    </div>
  );
}

export default PopularInstructors;
