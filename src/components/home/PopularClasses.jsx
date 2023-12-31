import { Link } from "react-router-dom";
import useAllClasses from "../../hooks/useAllClasses";
import Heading from "../shared/Heading";

function PopularClasses() {
  const [allClasses, isLoading] = useAllClasses();

  return (
    <div className="max-w-screen-2xl mx-auto px-3 my-32">
      <Heading title1={"Popular"} title2={"Classes"} />
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
                  <div className="flex justify-between font-semibold text-royalPurple">
                    <p>{e.courseName}</p>
                    <p>${e.price}</p>
                  </div>
                  <p className="text-sm my-3">Instructor: {e.instructorName}</p>
                  <div className="flex justify-between">
                    <p>
                      Enroll: {e.enroll}
                      <small className="text-xs ms-1">(Students)</small>
                    </p>
                    <p>
                      Seats: {e.seats}
                      <small className="text-xs ms-1">(Available)</small>
                    </p>
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
