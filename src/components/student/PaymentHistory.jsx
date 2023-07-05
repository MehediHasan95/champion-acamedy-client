import usePaymentHistory from "../../hooks/usePaymentHistory";
import { noData } from "../utilities/utils";

function PaymentHistory() {
  const [paymentHistory, isLoading] = usePaymentHistory();

  return (
    <div className="min-h-75">
      {paymentHistory?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead className="bg-royalPurple text-white">
              <tr>
                <th>Date</th>
                <th>Order Items</th>
                <th>Transaction ID</th>
                <th>Payable Amount</th>
                <th>Card Type</th>
                <th>Country</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="border dark:border-base-300">
              {!isLoading &&
                paymentHistory.map((e) => (
                  <tr key={e._id}>
                    <td>{e.create}</td>
                    <td>
                      {e.carts.map((e, index) => (
                        <p key={e._id} className="text-sm">
                          {index + 1}. {e.courseName}
                        </p>
                      ))}
                    </td>
                    <td>{e.transactionId}</td>
                    <td>${e.total}</td>
                    <td className="uppercase">{e.card}</td>
                    <td>{e.country}</td>
                    <td className="text-green-600 font-bold">Paid</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid place-items-center">
          <img src={noData} alt="no_data" className="w-3/6 lg:w-3/12" />
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
