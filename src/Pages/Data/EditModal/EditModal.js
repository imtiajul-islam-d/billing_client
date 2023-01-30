import React from "react";
import { toast } from "react-hot-toast";

const EditModal = ({
  setOpenEditModal,
  openEditModal,
  refetch,
  editmodalData,
}) => {
  console.log(editmodalData.bills.name);
  const modalData = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const amount = form.payableamount.value;
    const data = {
      name,
      email,
      phone,
      amount,
    };
    fetch(`https://billing-server-mu.vercel.app/api/update-billing/${editmodalData?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Data updated successfully..");
        refetch();
        setOpenEditModal(!openEditModal);
      });
  };
  return (
    <div>
      <input type="checkbox" id="editModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="editModal"
            onClick={() => setOpenEditModal(!openEditModal)}
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
                defaultValue={editmodalData?.bills?.name}
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
                defaultValue={editmodalData?.bills?.email}
                className="input input-bordered w-full"
              />
              <br />
              <label>Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="123-45-678"
                defaultValue={editmodalData?.bills?.phone}
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
                defaultValue={editmodalData?.bills?.amount}
                className="input input-bordered w-full"
              />
              <br />
              <input
                className="px-3 py-2 mt-3 border-2 border-gray-300 rounded-md cursor-pointer"
                type="submit"
                value="Update"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
