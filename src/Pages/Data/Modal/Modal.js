import React from "react";
import { toast } from "react-hot-toast";

const Modal = ({ setModalData, openModal, setOpenModal, refetch }) => {
  const modalData = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const amount = form.payableamount.value;
    const d = new Date();
    const time = d.getTime();
    const data = {
      bills: {
        name,
        email,
        phone,
        amount,
      },
      time,
    };
    fetch("http://localhost:5000/api/add-billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Added successfully..");
        console.log(result);
        refetch();
        setModalData(data);
        setOpenModal(!openModal);
      });
  };
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            onClick={() => setOpenModal(!openModal)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="bg-white px-10 py-10 rounded-md">
            <form onSubmit={modalData}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Type here"
                required
                className="input input-bordered w-full"
              />
              <br />
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Type here"
                required
                className="input input-bordered w-full"
              />
              <br />
              <label>Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="123-45-678"
                //   pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                className="input input-bordered w-full"
              />
              <br />
              <label>Payable Amount </label>
              <input
                type="number"
                id="payableamout"
                name="payableamount"
                placeholder="123-45-678"
                required
                className="input input-bordered w-full"
              />
              <br />
              <input
                className="px-3 py-2 mt-3 border-2 border-gray-300 rounded-md cursor-pointer"
                type="submit"
                value="Add bill"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
