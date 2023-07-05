import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAddToCart from "../../hooks/useAddToCart";
import useAuth from "../../hooks/useAuth";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_APP_SECRET_KEY);

function Payment() {
  const { user } = useAuth();
  const [carts, refetch, isLoading] = useAddToCart();
  const total = carts?.reduce(
    (previous, currest) => previous + currest.price,
    0
  );
  const navigate = useNavigate();

  return (
    <div className="min-h-75">
      {carts?.length > 0 ? (
        <div className="grid gap-3 p-3 lg:grid-cols-2">
          <div className="col-span-1">
            <p className="text-xl font-semibold mb-3">Your Order</p>
            {!isLoading &&
              carts?.map((e, index) => (
                <div key={e._id} className="p-2 mb-2">
                  <h1>
                    {index + 1}. {e.courseName}
                  </h1>
                  <p className="text-xs ms-5">Instructor: {e.instructorName}</p>
                </div>
              ))}
            <button className="text-2xl font-semibold my-5">
              Pay: ${total}
            </button>
          </div>
          <div className="col-span-1">
            <div className="my-5">
              <p className="text-xl font-semibold mb-3">Contact Information</p>
              <p>Email: {user && user?.email}</p>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm total={total} carts={carts} refetch={refetch} />
            </Elements>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center">
          <Player
            autoplay
            loop
            src="https://assets10.lottiefiles.com/packages/lf20_vuliyhde.json"
            style={{ height: "300px", width: "300px" }}
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
          <p className="text-green-500 text-2xl font-bold mb-5">
            Your Payment Successful
          </p>
          <button
            onClick={() => navigate(-1)}
            className="border bg-royalPurple text-white py-1 px-5"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default Payment;
