import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAddToCart from "../../hooks/useAddToCart";

const stripePromise = loadStripe(import.meta.env.VITE_APP_SECRET_KEY);

function Payment() {
  const [carts] = useAddToCart();
  const total = carts?.reduce(
    (previous, currest) => previous + currest.price,
    0
  );

  const classId = carts?.map((e) => e.classId);

  return (
    <div>
      <div className="my-5">
        <h1>Pay using credit cards</h1>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm total={total} classId={classId} />
      </Elements>
    </div>
  );
}

export default Payment;
