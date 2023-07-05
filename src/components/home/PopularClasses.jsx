import { Link } from "react-router-dom";
import useAllClasses from "../../hooks/useAllClasses";

function PopularClasses() {
  const [allClasses, isLoading] = useAllClasses();
  console.log(allClasses);

  return (
    <div className="max-w-screen-2xl mx-auto my-32 px-3">
      <h1 className="text-center text-5xl font-bold my-20">
        Popular <span className="text-royalPurple">Classes</span>
      </h1>
      <div>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
          {!isLoading &&
            allClasses?.slice(0, 6).map((e) => (
              <div key={e._id} className="col-span-1 bg-base-200">
                <div className="h-52">
                  <img
                    src={e.image}
                    alt="class_image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between font-semibold">
                    <p>{e.courseName}</p>
                    <p>${e.price}</p>
                  </div>
                  <p className="text-sm my-3">
                    Instructor: {e.instructorName} ({e.instructorEmail})
                  </p>
                  <div className="flex justify-between">
                    <p>Enroll Students: {e.enroll}</p>
                    <p>Available Seats: {e.seats}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="my-5 text-right">
          <Link to="/classes">
            <button className="text-royalPurple underline hover:font-semibold">
              See more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PopularClasses;
