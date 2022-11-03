import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const CheckOut = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const phone = form.phone.value;
    const email = user?.email || "Unregister";
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed successfully");
          form.reset();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleOrder} className="my-20">
      <h1 className="text-4xl">You are about to order {title}</h1>
      <p className="text-2xl py-5">Price: {price}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="input input-bordered input-lg w-full "
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="input input-bordered input-lg w-full "
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          className="input input-bordered input-lg w-full "
        />
        <input
          type="text"
          placeholder="Your Email"
          name="email"
          defaultValue={user?.email}
          className="input input-bordered input-lg w-full "
        />
      </div>
      <textarea
        className="textarea textarea-bordered h-20 w-full mt-8"
        name="message"
        placeholder="Your Comment"
      ></textarea>
      <input
        type="submit"
        className="btn btn-info w-full mt-5"
        value="Order Confirm"
      />
    </form>
  );
};

export default CheckOut;
