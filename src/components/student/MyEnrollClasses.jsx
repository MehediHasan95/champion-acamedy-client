import usePaymentHistory from "../../hooks/usePaymentHistory";
import { noData } from "../utilities/utils";

function MyEnrollClasses() {
  const [paymentHistory, isLoading, refetch] = usePaymentHistory();

  return (
    <div className="min-h-75">
      {paymentHistory?.length > 0 ? (
        <>
          {!isLoading &&
            paymentHistory?.map((enroll) => (
              <div key={enroll._id}>
                {enroll.carts.map((e) => (
                  <div
                    key={e._id}
                    className="bg-base-300 mb-3 overflow-hidden flex space-x-5"
                  >
                    <div className="w-48 h-40">
                      <img
                        src={e.image}
                        alt="class_image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full flex justify-between items-center p-5">
                      <div>
                        <h1 className="text-2xl font-semibold">
                          {e.courseName}
                        </h1>
                        <p>Instructor: {e.instructorName}</p>
                        <p>Email: {e.instructorEmail}</p>
                        <p>Price: ${e.price}</p>
                      </div>
                      <div>
                        <p>Name: {enroll.displayName}</p>
                        <p>Total: ${enroll.total}</p>
                        <p>TrxID: {enroll.transactionId}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </>
      ) : (
        <div className="grid place-items-center">
          <img src={noData} alt="no_data" className="w-3/6 lg:w-3/12" />
        </div>
      )}
    </div>
  );
}

export default MyEnrollClasses;
