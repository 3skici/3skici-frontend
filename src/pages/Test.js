import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Test = () => {
  const { productId } = useParams();
  const customId = productId;
  const dispatch = useDispatch();
  // const product = useSelector((state) => state.products.fetchedProduct);
  // console.log("this is the productID: ", product);

  return (
    <div>
      <span>customId </span>
      <div>{customId}</div>
    </div>
  );
};

export default Test;
