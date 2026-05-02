import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = () => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "sb",
        currency: "USD",
      }}
    >
      <div className="mt-4">
        <PayPalButtons
          style={{ layout: "vertical" }}
          
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00",
                  },
                },
              ],
            });
          }}

          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              console.log("Payment Success", details);
              alert("Payment Successful");
            });
          }}

          onError={(err) => {
            console.error("PayPal Error:", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;