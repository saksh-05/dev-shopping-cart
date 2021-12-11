import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Shoppinglist, Header, ShowShoppingList } from "@components";
import axios from "axios";
import GlobalStyle from "@styles/globalStyles";
import { useSelector } from "react-redux";
import { itemIncrease, viewItem } from "@redux/actions";
import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";
import styled from "styled-components";

const Menu: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const increaseVal = useSelector((state: RootState) => state.itemCounter);
  const itemView = useSelector((state: RootState) => state.toggle.itemView);
  const show = useSelector((state: RootState) => state.shoppinglist.show);

  const [val, setVal] = useState({
    category: [],
    allItems: [],
  });

  useEffect(() => {
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res) => {
          setVal({
            ...val,
            category: res.data.data.category,
            allItems: res.data.data.menu,
          });
        })
        .catch((err) => console.log(err));
    };

    getMenuList();
  }, [itemView.showShoppingItem, show]);
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Container>
          <div
            style={{
              alignItems: "center",
              display: "inline-flex",
              height: "fit-content",
            }}
          >
            <p style={{ fontSize: "26px", width: "30rem", fontWeight: 700 }}>
              <span style={{ color: "#f9a109", marginRight: "0.6rem" }}>
                Shoppingify
              </span>
              allows you take your shopping list wherever you go
            </p>
          </div>
          <div>
            {val.category.map((ctgry: typeof val.category[0]) => {
              return (
                <div key={ctgry["_id"]}>
                  <h4 key={ctgry["_id"] + "b"} style={{ marginBottom: "0" }}>
                    {ctgry["category"]}
                  </h4>
                  <div
                    key={ctgry["_id"] + "a"}
                    style={{ display: "inline-flex", flexWrap: "wrap" }}
                  >
                    {val.allItems.map((item: typeof val.allItems[0]) => {
                      const itemCategory: string = item["category"];
                      const ctgryCategory: string = ctgry["category"];
                      const itemId: string = item["_id"];
                      return itemCategory === ctgryCategory ? (
                        <button
                          key={item["_id"]}
                          style={{
                            justifyContent: "space-between",
                            width: "11.5rem",
                            height: "4rem",
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            border: "none",
                            background: "white",
                            marginRight: "1rem",
                            marginTop: "0.3rem",
                            fontFamily: "Quicksand",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            boxShadow: "1px 1px 8px -3px black",
                          }}
                        >
                          <div
                            key={item["_id"] + "a"}
                            onClick={() =>
                              dispatch(
                                viewItem({
                                  itemId,
                                })
                              )
                            }
                            style={{ width: "100%", textAlign: "left" }}
                          >
                            {item["name"]}
                          </div>
                          <Image
                            key={item["_id"] + "b"}
                            src="/icons/add.svg"
                            alt="add"
                            width="50"
                            height="26"
                            onClick={() =>
                              dispatch(
                                itemIncrease({
                                  item,
                                  count: 0 | increaseVal.itemArray[item["_id"]],
                                  ctgCount:
                                    0 |
                                    increaseVal.itemCategory[item["category"]],
                                })
                              )
                            }
                          />
                        </button>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        {itemView.showShoppingItem ? <ShowShoppingList /> : <Shoppinglist />}
      </Wrapper>
    </>
  );
};

export default Menu;

const Container = styled.div`
  width: 70%;
  padding-left: 2rem;
  padding-bottom: 2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: inline-flex;
`;
const Search = styled.div``;

const InputWrapper = styled.label`
  position: relative;
  display: inline-flex;
  align-item: center;
  :before {
    content: "";
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 20px;
    background: url(icons/search.svg) center / contain no-repeat;
  }
  input {
    padding: 10px 30px;
    border-radius: 0.5rem;
    border: none;
    background: white;
    box-shadow: 1px 1px 8px -3px black;
    font-size: 1rem;
    color: #bdbdbd;
  }
`;

const Txt = styled.p`
  color: #f9a109;
  margin-right: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const AllItems = styled.div`
  height: 10rem;
`;

const DisplayItem = styled.div``;
