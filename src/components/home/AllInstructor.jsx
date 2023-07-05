import useAllInstructor from "../../hooks/useAllInstructor";

function AllInstructor() {
  const [allInstructor] = useAllInstructor();

  return (
    <div className="min-h-75 max-w-screen-2xl mx-auto my-10">
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
        {allInstructor?.map((e) => (
          <div key={e._id} className="bg-base-200">
            <div className="h-96">
              <img
                src={e.photoURL}
                alt="instructor_image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h1 className="text-xl text-royalPurple font-semibold">
                {e.displayName}
              </h1>
              <p className="my-2">Email: {e.email}</p>
              <p className="text-sm uppercase">{e.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllInstructor;
