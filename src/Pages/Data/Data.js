import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import Nav from "../Shared/Navigation/Nav";
import DataNav from "./DataNav/DataNav";
import EditModal from "./EditModal/EditModal";
import Modal from "./Modal/Modal";

const Data = () => {
  const { user, loadingState, logout, login } = useContext(AUTH_CONTEXT);
  const [pagination, setPagination] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editmodalData, setEditmodalData] = useState({});
  console.log(editmodalData);
  //   load data
  const {
    isLoading,
    data: bills,
    refetch,
  } = useQuery({
    queryKey: ["bills", user?.email, pagination],
    queryFn: () =>
      fetch(
        `https://billing-server-mu.vercel.app/api/billing-list?page=${pagination}`
        // {
        //   headers: {
        //     authorization: `bearer ${localStorage.getItem("furniture")}`,
        //   },
        // }
      ).then((res) => res.json()),
  });
  // fetch total amount
  const { data: amount } = useQuery({
    queryKey: ["amount", user?.email, bills],
    queryFn: () =>
      fetch(
        `https://billing-server-mu.vercel.app/api/billing-list/amount`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("billing_user")}`,
          },
        }
      ).then((res) => res.json()),
  });
  let a = 0;
  amount?.data?.map((item) => {
    a = a + parseInt(item.bills.amount);
  });
  console.log(a)
  // delete bills
  const deleteBills = (id) => {
    const confirm = window.confirm("Confirm delete!");
    if (confirm) {
      fetch(`https://billing-server-mu.vercel.app/api/delete-billing/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success("Successfully deleted");
          refetch();
          console.log(result);
        });
    }
  };
  // delete bills
  if (isLoading) {
    return (
      <div className="fixed w-full h-screen flex items-center justify-center">
        {" "}
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black dark:border-violet-400"></div>
      </div>
    );
  }
  const pages = Math.ceil(bills.count / 10);

  console.log(pages);
  console.log(bills);
  //   login user

  return (
    <div>
      <div className="border-b-2 border-gray-200 bg-gray-100">
        <Nav amount={a}></Nav>
        <DataNav setOpenModal={setOpenModal} openModal={openModal}></DataNav>
      </div>
      {/* data loading */}
      <div className="min-h-[70vh] container mx-auto p-5">
        {/*  */}
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Billing ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Paid Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.bills.length === 0 && (
                <tr>
                  <td>No data found</td>
                </tr>
              )}
              {bills.bills.map((bill, index) => {
                return (
                  <tr key={bill?._id}>
                    <th>{index + 1}</th>
                    <td>{bill?._id}</td>
                    <td>{bill?.bills?.name}</td>
                    <td>{bill?.bills?.email}</td>
                    <td>{bill?.bills?.phone}</td>
                    <td>{bill?.bills?.amount}</td>
                    <td>
                      <button
                        onClick={() => {
                          setOpenEditModal(!openEditModal);
                        }}
                        className="btn btn-xs cursor-pointer"
                      >
                        <label
                          onClick={() => setEditmodalData(bill)}
                          className="cursor-pointer"
                          htmlFor="editModal"
                        >
                          edit
                        </label>
                      </button>
                      ||
                      <button
                        onClick={() => deleteBills(bill?._id)}
                        className="btn btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/*  */}
      </div>
      {/* pagination start */}
      <div className="flex justify-center items-center">
        <div className="btn-group">
          {[...Array(pages).keys()].map((number) => (
            <button
              key={number}
              className={`${pagination === number && "btn btn-active"} btn`}
              onClick={() => setPagination(number)}
            >
              {number + 1}
            </button>
          ))}
        </div>
        {openModal && (
          <Modal
            setOpenModal={setOpenModal}
            openModal={openModal}
            setModalData={setModalData}
            modalData={modalData}
            refetch={refetch}
          ></Modal>
        )}
      </div>
      {openEditModal && (
        <EditModal
          refetch={refetch}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          editmodalData={editmodalData}
        ></EditModal>
      )}
    </div>
  );
};

export default Data;
