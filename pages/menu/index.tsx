import React, { useEffect, useState } from "react";
import {
  Search,
  Wrapper,
  InputWrapper,
  Txt,
  Container,
  AllItems,
} from "./styled";
import Image from "next/image";
import { Shoppinglist, Header, ShowShoppingList } from "@components";
import axios from "axios";
import { GetStaticProps, GetStaticPaths } from "next";
import GlobalStyle from "@styles/globalStyles";

import { useSelector } from "react-redux";

import { increase, itemIncrease, viewItem } from "@redux/actions";
import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";
import store from "@redux/store";

type Props = {
  _id?: object;
  name: string;
  description: string;
  image: string;
  category: string;
  __v?: number;
};

const Menu: React.FC<any> = () => {
  // Log the initial state
  console.log("Initial state: ", store.getState());
  // {todos: [....], filters: {status, colors}}

  // Every time the state changes, log it
  // Note that subscribe() returns a function for unregistering the listener
  const unsubscribe = store.subscribe(() =>
    console.log("State after dispatch: ", store.getState())
  );

  const dispatch = useAppDispatch();
  const increaseVal = useSelector((state: RootState) => state.itemCounter);
  console.log(increaseVal.itemArray["6181998711f285ab41ee89f5"]);

  const itemView = useSelector((state: RootState) => state.toggle.itemView);
  const show = useSelector((state: RootState) => state.shoppinglist.show);

  const [val, setVal] = useState({
    category: [],
    allItems: [],
  });

  {
    console.log(val.category);
    console.log(val.allItems);
  }

  useEffect(() => {
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res) => {
          console.log(res.data.data);
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
            <Search>
              <InputWrapper>
                <input type="text" placeholder="search" />
              </InputWrapper>
            </Search>
          </div>
          <div>
            {val.category.map((ctgry: typeof val.category[0]) => {
              return (
                <div key={ctgry["_id"]}>
                  <h4 key={ctgry["_id"]} style={{ marginBottom: "0" }}>
                    {ctgry["category"]}
                  </h4>
                  <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
                    {val.allItems.map((item: typeof val.allItems) => {
                      const itemCategory: string = item["category"];
                      const ctgryCategory: string = ctgry["category"];
                      const itemId: string = item["_id"];
                      return itemCategory === ctgryCategory ? (
                        <button
                          key={itemId}
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
                            key={item["_id"]}
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
                        <></>
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

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch("http://localhost:3000/api/menuList");
//   const data = await res.json();
//   console.log("data", data);
//   return {
//     props: {
//       data: data,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every 10 seconds
//     revalidate: 10, // In seconds
//   };
// };

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch("http://localhost:3000/api/menuList");
//   const data = await res.json();
//   console.log(data);
//   const menus = data.data.menu;
//   // Get the paths we want to pre-render based on posts
//   const paths = menus.map((mn: typeof menus) => ({
//     params: { id: mn._id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: "blocking" };
// };

export default Menu;
