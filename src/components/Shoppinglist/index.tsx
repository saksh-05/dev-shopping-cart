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
  Minus,
  Plus,
  ItemVal,
  DeleteIcon,
  Counter,
  ListName,
  DisplayList,
  Item,
  Message,
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

interface itemType {
  _id: string;
  __v: number;
  category: string;
  name: string;
  note: string;
  image: string;
}

export const Shoppinglist: React.FC = () => {
  const dispatch = useAppDispatch();
  const [val, setVal] = useState({
    category: new Map(),
    allItems: [],
  });
  const [itemName, setItemName] = useState("");
  const [itemDetail, setItemDetail] = useState<itemType>({
    _id: "",
    __v: 0,
    category: "",
    name: "",
    note: "",
    image: "",
  });
  const [dropDown, setDropDown] = useState(false);
  const increaseVal = useSelector((state: RootState) => state.itemCounter);
  const itemArray = useSelector(
    (state: RootState) => state.itemCounter.itemArray
  );
  const itmCtgry = useSelector(
    (state: RootState) => state.itemCounter.itemCategory
  );
  const show = useSelector((state: RootState) => state.shoppinglist.show);
  const categoryKeys = Object.keys(itmCtgry);
  const [listChange, setListChange] = useState(false);
  const [message, setMessage] = useState(false);
  const [listName, setListName] = useState("");

  const title = useSelector((state: RootState) => state.shoppinglist.title);

  useEffect(() => {
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res: any) => {
          setVal({
            ...val,
            allItems: res.data.data.menu,
          });
        })
        .catch((err: any) => console.log(err));
    };

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
              padding: "2rem 2rem 0 2rem",
              height: "85%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: listChange ? "block" : "none",
                height: "100%",
                position: "fixed",
                right: "0",
                top: "0",
                zIndex: 1,
                background: "black",
                opacity: "30%",
                width: "30%",
              }}
            ></div>
            <ListName style={{ display: listChange ? "block" : "none" }}>
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
                <p style={{ fontWeight: 700 }}>Didn`t find what you need?</p>
                <Btn onClick={() => dispatch(addItem())}>Add Item</Btn>
              </Txt>
            </Wrapper>
            {Object.keys(itemArray).length !== 0 ? (
              <div
                style={{
                  margin: "1rem 0rem 0.5rem 0rem",
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
            <ShoppingListItem>
              {Object.keys(itemArray).length !== 0 ? (
                categoryKeys.map((ctgry) => {
                  return (
                    <div key={ctgry + "A"}>
                      <h4
                        key={ctgry}
                        style={{
                          margin: "0.5rem 0rem",
                          fontWeight: 700,
                          fontFamily: "Quicksand",
                          color: "#828282",
                        }}
                      >
                        {ctgry}
                      </h4>
                      <div
                        key={ctgry + "B"}
                        style={{
                          display: "inline-flex",
                          flexWrap: "wrap",
                          width: "100%",
                        }}
                      >
                        {val.allItems.map((item: itemType) => {
                          const itemId: string = item["_id"];
                          const count: number = itemArray[itemId];
                          const itemCategory: string = item["category"];
                          const ctgryCategory: string = ctgry;
                          return itemCategory === ctgryCategory &&
                            count !== undefined ? (
                            <h3
                              key={itemId}
                              style={{
                                display: "inline-flex",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "center",
                                margin: "4px 0px",
                              }}
                            >
                              {item.name}

                              <ItemVal key={itemId + "a"}>
                                <DeleteIcon
                                  key={itemId + "b"}
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
                                    key={itemId + "c"}
                                    src="/icons/delete.svg"
                                    alt="delete"
                                    width="20"
                                    height="20"
                                  />
                                </DeleteIcon>
                                <Minus
                                  key={itemId + "d"}
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
                                <Counter key={itemId + "e"}>
                                  {count} pcs
                                </Counter>
                                <Plus
                                  key={itemId + "f"}
                                  onClick={() =>
                                    dispatch(
                                      itemIncrease({
                                        item,
                                        count:
                                          0 | increaseVal.itemArray[itemId],
                                        ctgCount:
                                          0 |
                                          increaseVal.itemCategory[
                                            itemCategory
                                          ],
                                      })
                                    )
                                  }
                                >
                                  +
                                </Plus>
                              </ItemVal>
                            </h3>
                          ) : (
                            ""
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
            {message && (
              <Message>
                No item found, Add Item
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setMessage(false)}
                >
                  X
                </div>
              </Message>
            )}
            {dropDown && (
              <DisplayList>
                {itemName === "" ? (
                  <div>
                    {val.allItems.map((itm: itemType) => {
                      const name: string = itm["name"];
                      return (
                        <Item
                          key={itm["_id"]}
                          onClick={() => {
                            setItemName(name);
                            setItemDetail(itm);
                            setDropDown(false);
                          }}
                        >
                          {name}
                        </Item>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {val.allItems.map((itm: itemType) => {
                      const name: string = itm["name"];
                      return name
                        .toLowerCase()
                        .includes(itemName.toLowerCase()) ? (
                        <Item
                          key={itm["_id"]}
                          onClick={() => {
                            setItemName(name);
                            setItemDetail(itm);
                            setDropDown(false);
                          }}
                        >
                          {name}
                        </Item>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                )}
              </DisplayList>
            )}
          </div>

          <Search>
            <InputWrapper>
              <input
                type="text"
                value={itemName}
                placeholder="Enter a name"
                style={{
                  height: "3.5rem",
                  width: "13.4rem",
                  border: "3px solid #F9A109",
                  borderRadius: "0.8rem 0 0 0.8rem",
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                }}
                onChange={(e: SyntheticEvent) => {
                  const val = e.target as HTMLInputElement;
                  setItemName(val.value);
                }}
                onFocus={() => setDropDown(true)}
              />
              <input
                type="submit"
                value="Save"
                style={{
                  background: "#F9A109",
                  border: "none",
                  borderRadius: "0 0.8rem 0.8rem 0",
                  height: "3.5rem",
                  width: "5rem",
                  fontFamily: "Quicksand",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setItemName("");
                  setDropDown(false);
                  {
                    val.allItems.map((itm) => {
                      const name: string = itm["name"];
                      return itm["_id"] === itemDetail["_id"] ||
                        name.toLowerCase() === itemName.toLowerCase()
                        ? dispatch(
                            itemIncrease({
                              item: itemDetail,
                              count:
                                0 | increaseVal.itemArray[itemDetail["_id"]],
                              ctgCount:
                                0 |
                                increaseVal.itemCategory[
                                  itemDetail["category"]
                                ],
                            })
                          )
                        : (setMessage(true),
                          setTimeout(() => {
                            setMessage(false);
                          }, 3000));
                    });
                  }
                }}
              />
            </InputWrapper>
          </Search>
        </WrapperA>
      )}
    </>
  );
};
