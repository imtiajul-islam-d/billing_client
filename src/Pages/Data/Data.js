import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import DataNav from "./DataNav/DataNav";

const Data = () => {
  const { user, loadingState, logout, login } = useContext(AUTH_CONTEXT);
  const [pagination, setPagination] = useState(0);
  //   load data
  const {
    isLoading,
    data: bills,
    refetch,
  } = useQuery({
    queryKey: ["bills", user?.email, pagination],
    queryFn: () =>
      fetch(
        `http://localhost:5000/api/billing-list?page=${pagination}`
        // {
        //   headers: {
        //     authorization: `bearer ${localStorage.getItem("furniture")}`,
        //   },
        // }
      ).then((res) => res.json()),
  });
  if (isLoading) {
    return <div> loading</div>;
  }
  const pages = Math.ceil(bills.count / 10);

  console.log(pages);
  console.log(bills);
  //   login user

  return (
    <div>
      <DataNav></DataNav>
      <div>
        <div className="btn-group">
          {[...Array(pages).keys()].map((number) => (
            <button
              key={number}
              className={pagination === number && "btn btn-active"}
              onClick={() => setPagination(number)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
