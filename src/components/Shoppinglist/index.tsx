import React, { SyntheticEvent, useState, useEffect } from "react";
import { ListForm } from "@components";
import {
  WrapperA,
  Search,
  InputWrapper,
  Wrapper,
  Txt,
  Btn,
  ShoppingListItem,
  ItemCounter,
  Minus,
  Plus,
  ItemVal,
  DeleteIcon,
  Counter,
  ListName,
} from "./styled";
import Image from "next/image";

import axios from "axios";

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
import Category from "models/Category";
import menuList from "pages/api/menuList";
import { object } from "yup/lib/locale";

export const Shoppinglist: React.FC = () => {
  const dispatch = useAppDispatch();
  const shopVal = useSelector((state: RootState) => state.shoppinglist.shop);
  // const [addItem, setAddItem] = useState(false);
  const [val, setVal] = useState({
    category: new Map(),
    allItems: [],
  });
  const increaseVal = useSelector((state: RootState) => state.itemCounter);
  const itemArray = useSelector(
    (state: RootState) => state.itemCounter.itemArray
  );
  const itmCtgry = useSelector(
    (state: RootState) => state.itemCounter.itemCategory
  );
  const show = useSelector((state: RootState) => state.shoppinglist.show);
  const categoryKeys = Object.keys(itmCtgry);
  console.log(itmCtgry);
  const [listChange, setListChange] = useState(false);
  const [listName, setListName] = useState("");

  const title = useSelector((state: RootState) => state.shoppinglist.title);

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

  return (
    <>
      {show ? (
        <ListForm />
      ) : (
        <WrapperA>
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
              style={{ cursor: "pointer", margin: "0", textAlign: "right" }}
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
          {Object.keys(itemArray).length !== 0 ? (
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
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => setListChange(true)}
              >
                <Image
                  src="/icons/edit.svg"
                  alt="edit"
                  height="30"
                  width="30"
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                fontWeight: 700,
                textAlign: "center",
                alignItems: "center",
                fontFamily: "Quicksand",
                fontSize: "20px",
              }}
            >
              No item
            </div>
          )}
          {/* Object.keys(itemArray).length &&  */}
          <ShoppingListItem>
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
                        display: "inline-flex",
                        flexWrap: "wrap",
                        width: "100%",
                      }}
                    >
                      {val.allItems.map((item: typeof val.allItems) => {
                        const itemId: string = item._id;
                        const count: number = itemArray[itemId];
                        const itemCategory: string = item.category;
                        const ctgryCategory: string = ctgry;
                        console.log(count);
                        return itemCategory === ctgryCategory &&
                          count !== undefined ? (
                          <h3
                            style={{
                              display: "inline-flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            {item.name}
                            {/* <ItemCounter>{count} pcs</ItemCounter> */}

                            <ItemVal>
                              <DeleteIcon
                                onClick={() =>
                                  dispatch(
                                    itemDelete({
                                      item,
                                      ctgCount: 0 | itmCtgry[itemCategory],
                                    })
                                  )
                                }
                              >
                                <Image
                                  src="/icons/delete.svg"
                                  alt="delete"
                                  width="20"
                                  height="20"
                                />
                              </DeleteIcon>
                              <Minus
                                onClick={() =>
                                  dispatch(
                                    itemDecrease({
                                      item,
                                      count: 0 | itemArray[itemId],
                                      ctgCount: 0 | itmCtgry[itemCategory],
                                    })
                                  )
                                }
                              >
                                -
                              </Minus>
                              <Counter>{count} pcs</Counter>
                              <Plus
                                onClick={() =>
                                  dispatch(
                                    itemIncrease({
                                      item,
                                      count: 0 | increaseVal.itemArray[itemId],
                                      ctgCount:
                                        0 |
                                        increaseVal.itemCategory[itemCategory],
                                    })
                                  )
                                }
                              >
                                +
                              </Plus>
                            </ItemVal>
                          </h3>
                        ) : (
                          <></>
                        );
                      })}
                    </div>
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
          <Search>
            <InputWrapper>
              <input
                type="text"
                placeholder="Enter a name"
                style={{
                  height: "3.5rem",
                  width: "14rem",
                  border: "3px solid #F9A109",
                  borderRadius: "0.8rem",
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                }}
              />
              <input
                type="submit"
                value="Save"
                style={{
                  background: "#F9A109",
                  border: "none",
                  borderRadius: "0.8rem",
                  height: "3.5rem",
                  position: "relative",
                  right: "2rem",
                  width: "5rem",
                  fontFamily: "Quicksand",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              />
            </InputWrapper>
          </Search>
        </WrapperA>
      )}
    </>
  );
};
