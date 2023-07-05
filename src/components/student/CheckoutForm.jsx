import { faSpinner, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { amex, discover, mastercard, visa } from "../utilities/utils";

function CheckoutForm({ total, carts, refetch }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errMsg, setErrMsg] = useState("");
  const [loader, setLoader] = useState(false);

  const [clientSecret, setClientSecret] = useState("");
  const { user, create } = useAuth();

  const [instance] = useAxiosSecure();

  useEffect(() => {
    if (total > 0) {
      instance.post("/create-payment-intent", { total }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [instance, total]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    if (!stripe || !elements) {
      setLoader(false);
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      setLoader(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoader(false);
      setErrMsg(error.message);
    } else {
      setErrMsg("");
    }

    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      }
    );
    if (err) {
      setLoader(false);
      setErrMsg(err.message);
    } else {
      if (paymentIntent?.status === "succeeded") {
        const paymentInfo = {
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          transactionId: paymentIntent?.id,
          total,
          carts,
          card: paymentMethod?.card?.brand,
          country: paymentMethod?.card?.country,
          create,
        };
        instance.post("/payment", paymentInfo).then((res) => {
          if (res.data.deletedCount > 0) {
            setLoader(false);
            refetch();
          }
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <p className="text-sm">Card information</p>
          <div className="flex space-x-1">
            <img src={visa} alt="visa" className="w-10" />
            <img src={mastercard} alt="mastercard" className="w-10" />
            <img src={amex} alt="amex" className="w-10" />
            <img src={discover} alt="discover" className="w-10" />
          </div>
        </div>
        <CardElement
          className="border border-base-300 p-3 my-2"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <p className="my-3 text-xs text-red-500">{errMsg}</p>
        <button
          type="submit"
          className="w-full p-2 bg-stone-900 text-white"
          disabled={!stripe || !clientSecret}
        >
          {loader ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <>
              <FontAwesomeIcon icon={faWallet} /> Pay
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
