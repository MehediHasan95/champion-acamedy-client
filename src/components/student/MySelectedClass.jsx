import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAddToCart from "../../hooks/useAddToCart";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { SnackbarSuccess } from "../utilities/Snackbar";
import { Link } from "react-router-dom";
import { emptyCart } from "../utilities/utils";
import useTitle from "../../hooks/useTitle";

function MySelectedClass() {
  useTitle("Cart");
  const [carts, refetch, isLoading] = useAddToCart();
  const [instance] = useAxiosSecure();

  const handleDeleteCart = (_id) => {
    instance.delete(`/add-to-cart/${_id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        SnackbarSuccess("Remove from list");
      }
    });
  };

  const total = carts?.reduce(
    (previous, currest) => previous + currest.price,
    0
  );

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3 p-2">
        <div className="lg:col-span-2">
          {carts?.length > 0 ? (
            <>
              {!isLoading &&
                carts?.map((e) => (
                  <div
                    key={e._id}
                    className="mx-auto flex space-x-3 mb-2 border border-base-300"
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
                      <button
                        onClick={() => handleDeleteCart(e._id)}
                        className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 me-5"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="text-center my-10">
              <img src={emptyCart} alt="no-data" className="w-2/12 mx-auto" />
            </div>
          )}
        </div>
        <div className="col-span-1">
          <div className="p-3 border border-base-300">
            <h1 className="font-semibold">Order Summery</h1>
            <p>Selected classes: ({carts?.length})</p>
            <div className="flex justify-between my-3">
              <p>Total:</p>
              <p>${total}</p>
            </div>

            {total > 0 && (
              <Link to="payment">
                <button
                  htmlFor="payment"
                  className="p-2 w-full inline-block text-center cursor-pointer bg-royalPurple text-white"
                >
                  Process to Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySelectedClass;
