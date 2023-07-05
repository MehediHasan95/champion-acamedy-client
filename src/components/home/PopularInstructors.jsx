import axios from "axios";
import { useState } from "react";

function PopularInstructors() {
  const [popuparInstructor, setPopuparInstructor] = useState([]);

  axios.get("http://localhost:5000/popular-instructor").then((res) => {
    setPopuparInstructor(res.data);
  });

  return (
    <div className="max-w-screen-2xl mx-auto my-32 px-3">
      <h1 className="text-center text-5xl font-bold my-20">
        Popular <span className="text-royalPurple">Instructors</span>
      </h1>
      {popuparInstructor.length > 0 ? (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
          {popuparInstructor?.map((e) => (
            <div key={e._id} className="bg-base-200 relative">
              <div className="h-96">
                <img
                  src={e.instructorImage}
                  alt="instructor_image"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-center bg-royalPurple bg-opacity-50 py-3 text-xl font-lobster absolute bottom-0 left-0 right-0 text-white">
                {e.instructorName}
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Instructor data not found</p>
      )}
    </div>
  );
}

export default PopularInstructors;
