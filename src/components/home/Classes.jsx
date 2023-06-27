import useAllClasses from "../../hooks/useAllClasses";
import ClassesCard from "../utilities/ClassesCard";

function Classes() {
  const [allClasses, isLoading] = useAllClasses();

  return (
    <div className="my-10">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 px-3">
        {!isLoading &&
          allClasses?.map((e) => <ClassesCard key={e._id} allClasses={e} />)}
      </div>
    </div>
  );
}

export default Classes;
