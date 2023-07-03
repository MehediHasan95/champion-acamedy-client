import { faSpinner, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

function CheckoutForm({ total, classId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loader, setLoader] = useState(false);

  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

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

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoader(false);
      setErrMsg(error.message);
    } else {
      setLoader(false);
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
        setSuccessMsg(paymentIntent?.status);
        const paymentInfo = {
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          transactionId: paymentIntent?.id,
          total,
          classId,
        };
        instance.post("/payment", paymentInfo).then((res) => {
          if (res.data.deletedCount > 0) {
            setLoader(false);
          }
        });
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl p-5 border border-base-300 rounded-lg"
      >
        <CardElement
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
        <button
          type="submit"
          className="w-full mt-5 p-2 bg-stone-900 text-white"
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
      <p className="text-xs text-red-500">{errMsg}</p>
      <p className="text-xs text-green-500">{successMsg}</p>
    </div>
  );
}

export default CheckoutForm;
