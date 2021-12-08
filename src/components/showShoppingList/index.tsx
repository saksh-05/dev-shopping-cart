import React, { SyntheticEvent, useState, useEffect } from "react";
import { ListForm } from "@components";
import {
  WrapperA,
  Search,
  InputWrapper,
  Wrapper,
  Txt,
  Btn,
  Back,
  ShowItem,
  ButtonGrp,
} from "./styled";
import Image from "next/image";
import { useSelector } from "react-redux";

import { RootState } from "@redux/reducers";
import axios from "axios";
import { AppProps } from "next/app";
import { useAppDispatch } from "@redux/store";
import { viewItem, itemIncrease } from "@redux/actions";

export const ShowShoppingList = () => {
  const dispatch = useAppDispatch();
  const shopVal = useSelector((state: RootState) => state.shoppinglist.shop);
  const increaseVal = useSelector((state: RootState) => state.itemCounter);
  const itemView = useSelector((state: RootState) => state.toggle.itemView);
  console.log(itemView);
  // const showId=itemView.showId;

  const [showItemDetail, setShowItemDetail] = useState({
    data: {
      image: "",
      _id: "",
      __v: "",
      name: "",
      note: "",
      category: "",
    },
  });

  useEffect(() => {
    const getMenuList = async () => {
      await axios
        .get(`/api/menuList/${itemView.showId}`)
        .then((res) => {
          setShowItemDetail(res.data);
        })
        .catch((err) => console.log(err));
    };
    console.log("useEffect");
    getMenuList();
  }, [setShowItemDetail, itemView.showId]);

  const handleItemDelete = async () => {
    await axios
      .delete(`/api/menuList/${itemView.showId}`, {
        data: {
          id: itemView.showId,
          category: showItemDetail.data.category,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("delete error", err));
    dispatch(
      viewItem({
        itemId: "",
      })
    );
  };

  return (
    <>
      {console.log(showItemDetail)}
      <WrapperA>
        <Back
          onClick={() =>
            dispatch(
              viewItem({
                itemId: "",
              })
            )
          }
        >
          <Image src="/icons/back.svg" alt="back" width="15" height="15" />
          back
        </Back>
        {showItemDetail && showItemDetail.data !== undefined ? (
          <ShowItem>
            <div style={{ background: "#FAFAFE", marginTop: "1rem" }}>
              {showItemDetail.data.image !== "" ? (
                <Image
                  width="290"
                  height="224"
                  src={showItemDetail.data.image}
                  alt="Image"
                />
              ) : (
                <Image
                  src="/icons/landscape.svg"
                  alt="landscape"
                  width="290"
                  height="224"
                />
              )}
            </div>
            <h6
              style={{
                marginBottom: "0.8rem",
                fontSize: " 0.8rem",
                color: "#c1c1c4",
              }}
            >
              name
            </h6>
            <h3 style={{ marginTop: "0" }}>{showItemDetail.data.name}</h3>
            <h6
              style={{
                marginBottom: "0.8rem",
                fontSize: " 0.8rem",
                color: "#c1c1c4",
              }}
            >
              category
            </h6>
            <h3 style={{ marginTop: "0" }}>{showItemDetail.data.category}</h3>
            <h6
              style={{
                marginBottom: "0.8rem",
                fontSize: " 0.8rem",
                color: "#c1c1c4",
              }}
            >
              note
            </h6>
            <h3 style={{ marginTop: "0" }}>{showItemDetail.data.note}</h3>
          </ShowItem>
        ) : (
          <></>
        )}
        <ButtonGrp>
          <button
            style={{
              height: "3rem",
              width: "5rem",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "Quicksand",
              fontWeight: 600,
              background: "red",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={handleItemDelete}
          >
            delete
          </button>
          <button
            style={{
              height: "3rem",
              width: "8rem",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "Quicksand",
              fontWeight: 600,
              background: "#F9A109",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(
                itemIncrease({
                  item: showItemDetail.data,
                  count: 0 | increaseVal.itemArray[showItemDetail.data._id],
                })
              );
              dispatch(
                viewItem({
                  itemId: "",
                })
              );
            }}
          >
            Add to list
          </button>
        </ButtonGrp>
      </WrapperA>
    </>
  );
};
