import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import {
  Wrapper,
  WrapperA,
  Txt,
  Btn,
  ShoppingListItem,
  ItemVal,
  Counter,
  ListDetail,
  Dialog,
  ListName,
} from "./styled";
import Image from "next/image";

import { useSelector } from "react-redux";

import {
  itemIncrease,
  addItem,
  itemDecrease,
  itemDelete,
  changeTitle,
} from "@redux/actions";
import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";
import store from "@redux/store";

export const AnalyticList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showDailog, setShowDailog] = useState(false);
  const [listChange, setListChange] = useState(false);
  const [listName, setListName] = useState("");
  const [val, setVal] = useState({
    category: new Map(),
    allItems: [],
  });
  const title = useSelector((state: RootState) => state.shoppinglist.title);
  console.log(title);
  console.log("Initial state: ", store.getState());
  // {todos: [....], filters: {status, colors}}

  // Every time the state changes, log it
  // Note that subscribe() returns a function for unregistering the listener
  const unsubscribe = store.subscribe(() =>
    console.log("State after dispatch: ", store.getState())
  );
  const itemArray = useSelector(
    (state: RootState) => state.itemCounter.itemArray
  );
  const itmCtgry = useSelector(
    (state: RootState) => state.itemCounter.itemCategory
  );
  console.log(itmCtgry);
  const categoryKeys = Object.keys(itmCtgry);
  const itemKeys = Object.keys(itemArray);
  useEffect(() => {
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res) => {
          console.log(res.data.data.menu);
          setVal({
            ...val,
            allItems: res.data.data.menu,
          });
        })
        .catch((err) => console.log(err));
    };

    console.log("shoppingList");

    getMenuList();
  }, [setVal]);

  const dt = new Date();
  const dtVal: String = dt.toDateString();
  console.log(dtVal);

  const handleListUpload = async (e: SyntheticEvent) => {
    const dt = e.target as HTMLInputElement;

    console.log(dt.value);
    await axios
      .post("/api/addList", {
        title: title,
        itemId: itemArray,
        progress: dt.value === "cancel" ? false : true,
        timestamps: dtVal,
        categoryId: itmCtgry,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <WrapperA>
      <div
        style={{
          display: showDailog ? "block" : "none",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: 1,
          background: "black",
          opacity: "30%",
        }}
      ></div>

      <Dialog style={{ display: showDailog ? "block" : "none" }}>
        <p
          style={{
            marginBottom: "0",
            textAlign: "right",
            paddingRight: "1.5rem",
            fontSize: " 1.2rem",
            cursor: "pointer",
          }}
          onClick={() => setShowDailog(false)}
        >
          X
        </p>
        <p>Are you sure that you want to cancel this list?</p>
        <div>
          <button
            style={{
              border: "none",
              height: "3rem",
              width: "5rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              fontSize: "1rem",
              marginRight: "2rem",
              cursor: "pointer",
            }}
            onClick={() => setShowDailog(false)}
          >
            cancel
          </button>
          <button
            value="cancel"
            style={{
              border: "none",
              background: "#EB5757",
              color: "white",
              height: "3rem",
              width: "5rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              fontSize: "1rem",
            }}
            onClick={(e) => {
              handleListUpload(e), setShowDailog(false);
            }}
          >
            Yes
          </button>
        </div>
      </Dialog>
      <div
        style={{
          display: listChange ? "block" : "none",
          width: "22rem",
          height: "100%",
          position: "fixed",
          right: "0",
          top: "0",
          zIndex: 1,
          background: "black",
          opacity: "30%",
        }}
      ></div>
      <ListName style={{ display: listChange ? "block" : "none" }}>
        <p
          style={{ cursor: "pointer", margin: "0" }}
          onClick={() => {
            setListChange(false);
          }}
        >
          X
        </p>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Change List Name
        </label>
        <input
          style={{
            width: "100%",
            borderRadius: "0.5rem",
            border: "1px solid black",
            height: "2rem",
          }}
          onChange={(e) => {
            console.log(e.target.value);
            setListName(e.target.value);
          }}
        />
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              border: "none",
              height: "3rem",
              width: "5rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              fontSize: "1rem",
              marginRight: "2rem",
              cursor: "pointer",
            }}
            onClick={() => setListChange(false)}
          >
            cancel
          </button>
          <button
            style={{
              border: "none",
              background: "#EB5757",
              color: "white",
              height: "3rem",
              width: "5rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(changeTitle(listName));
              setListChange(false);
            }}
          >
            Yes
          </button>
        </div>{" "}
      </ListName>
      <Wrapper>
        <img
          src="/icons/source.svg"
          alt="additem"
          width="100"
          height="100"
          style={{ position: "relative", top: "-17px", height: "125px" }}
        />
        <Txt>
          <p style={{ fontWeight: 700 }}>Didn’t find what you need?</p>
          <Btn onClick={() => dispatch(addItem())}>Add Item</Btn>
        </Txt>
      </Wrapper>
      <ShoppingListItem>
        <div
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            justifyContent: "space-between",
          }}
        >
          {title}
          <div style={{ cursor: "pointer", display: "flex" }}>
            <Image
              src="/icons/edit.svg"
              alt="edit"
              height="30"
              width="30"
              onClick={() => setListChange(true)}
            />
          </div>
        </div>
        {Object.keys(itemArray).length !== 0 ? (
          categoryKeys.map((ctgry) => {
            return (
              <div>
                <h4
                  style={{
                    marginBottom: "0.5rem",
                    fontWeight: 700,
                    fontFamily: "Quicksand",
                    color: "#828282",
                  }}
                >
                  {ctgry}
                </h4>
                <div
                  style={{
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {val.allItems.map((item: typeof val.allItems) => {
                    const itemId: string = item._id;
                    const count: number = itemArray[itemId];
                    const itemCategory: string = item.category;
                    const ctgryCategory: string = ctgry;
                    return itemCategory === ctgryCategory &&
                      count !== undefined ? (
                      <ItemVal>
                        <input
                          type="checkbox"
                          style={{ height: "1.5rem", width: "1.5rem" }}
                        />
                        <span></span>
                        <h3
                          style={{
                            display: "inline-flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          {item.name}
                        </h3>
                        <Counter>{count} pcs</Counter>
                      </ItemVal>
                    ) : (
                      <></>
                    );
                  })}
                </div>
                <ListDetail>
                  <button
                    style={{
                      height: "3rem",
                      width: "6rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      fontFamily: "Quicksand",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onClick={() => setShowDailog(true)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      height: "3rem",
                      width: "9rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      fontFamily: "Quicksand",
                      fontWeight: 700,
                      background: "#4fdfff",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={(e) => handleListUpload(e)}
                  >
                    Complete
                  </button>
                </ListDetail>
              </div>
            );
          })
        ) : (
          <>
            <Image
              src="/icons/sh_app.svg"
              alt="empty cart"
              height="256"
              width="256"
            />
          </>
        )}
      </ShoppingListItem>
    </WrapperA>
  );
};
