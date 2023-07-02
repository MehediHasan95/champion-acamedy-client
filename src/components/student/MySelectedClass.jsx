import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAddToCart from "../../hooks/useAddToCart";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function MySelectedClass() {
  const [carts, refetch, isLoading] = useAddToCart();
  console.log(carts);

  return (
    <div>
      <div className="grid lg:grid-cols-3">
        <div className="col-span-2">
          {!isLoading &&
            carts?.map((e) => (
              <div
                key={e._id}
                className="w-11/12 lg:w-3/4 mx-auto flex space-x-3 mb-2 shadow"
              >
                <div className="w-24 h-20">
                  <img
                    src={e.image}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex justify-between items-center">
                  <div>
                    <h1 className="font-semibold">{e.courseName}</h1>
                    <p className="leading-3">
                      <small>Instructor: {e.instructorName}</small>
                    </p>
                    <p className="leading-3">
                      <small>Price: ${e.price}</small>
                    </p>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 me-5">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="col-span-1">
          <div className="shadow p-3">
            <h1 className="font-semibold">Order Summery</h1>
            <p>Selected classes: ({carts?.length})</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySelectedClass;
