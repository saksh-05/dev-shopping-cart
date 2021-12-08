import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Wrapper,
  Container,
  TopItem,
  TopCategory,
  Progress,
  FakeProgress,
  Heading,
  Chart,
  WrapperA,
} from "./styled";
import { Header, ShowShoppingList, AnalyticList } from "@components";
import GlobalStyle from "@styles/globalStyles";
import { useSelector } from "react-redux";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  itemIncrease,
  addItem,
  itemDecrease,
  itemDelete,
} from "@redux/actions";
import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";

const Analytics: React.FC = () => {
  const dispatch = useAppDispatch();
  const itemView = useSelector((state: RootState) => state.toggle.itemView);
  const [val, setVal] = useState({
    category: [],
    allItems: [],
  });
  const [perVal, setPerVal] = useState({
    categoryVal: [],
    itemVal: [],
  });
  const itemArray = useSelector(
    (state: RootState) => state.itemCounter.itemArray
  );
  const itmCtgry = useSelector(
    (state: RootState) => state.itemCounter.itemCategory
  );
  console.log(itmCtgry);
  const categoryKeys = Object.keys(itmCtgry);
  const categoryValue = Object.values(itmCtgry);
  const itemKeys = Object.keys(itemArray);
  const itemValue = Object.values(itemArray);
  console.log(itemKeys);
  console.log(itemValue);
  console.log(categoryValue);

  console.log(itmCtgry);
  console.log(categoryKeys.length);
  console.log(categoryKeys.sort());
  console.log(val.category.length);
  const totalCategoryValue = categoryValue.reduce(function (acc, vl) {
    return acc + vl;
  }, 0);
  const totalItemValue = itemValue.reduce((itm, val) => {
    return itm + val;
  }, 0);
  console.log(totalCategoryValue);
  console.log(totalItemValue);
  categoryKeys.map((ctgry) => {
    const pr = (itmCtgry[ctgry] * 100) / totalCategoryValue;
    perVal.categoryVal.some((m) => m["ctgry"] === ctgry)
      ? ""
      : perVal.categoryVal.push({ ctgry, pr });
  });
  itemKeys.map((itm) => {
    const pr = (itemArray[itm] * 100) / totalItemValue;
    perVal.itemVal.some((m) => m["itm"] === itm)
      ? ""
      : perVal.itemVal.push({ itm, pr });
  });
  perVal.categoryVal.sort((a, b) => {
    return a.pr > b.pr ? -1 : b.pr > a.pr ? 1 : 0;
  });
  perVal.itemVal.sort((a, b) => {
    return a.pr > b.pr ? -1 : b.pr > a.pr ? 1 : 0;
  });
  if (perVal.categoryVal.length > 3) {
    perVal.categoryVal = perVal.categoryVal.slice(0, 3);
  }
  if (perVal.itemVal.length > 3) {
    perVal.itemVal = perVal.itemVal.slice(0, 3);
  }
  console.log(perVal.categoryVal);
  console.log(perVal.itemVal);
  // categoryKeys.map((ctgry) => {
  //   const pr = (itmCtgry[ctgry] * 100) / totalCategoryValue;
  //   perVal.categoryVal.push({ ctgry, pr });
  // });
  // perVal.categoryVal = perVal.categoryVal.sort(function (a, b) {
  //   console.log(a.pr);
  //   // return a.pr.localeCompare(b.pr);
  //   return {};
  // });
  useEffect(() => {
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res) => {
          console.log(res.data.data.menu);
          setVal({
            ...val,
            allItems: res.data.data.menu,
            category: res.data.data.category,
          });
        })
        .catch((err) => console.log(err));
    };

    console.log("shoppingList");

    getMenuList();
  }, [setVal]);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <WrapperA>
          <Container>
            <TopItem>
              <h3>Top Items</h3>
              {perVal.itemVal.map((item) => {
                console.log(item);
                return val.allItems.map((Litem) => {
                  return Litem._id === item["itm"] ? (
                    <div style={{ marginBottom: "1rem" }}>
                      <Heading style={{ width: "69%" }}>
                        <div>{Litem.name}</div>
                        <div>{Math.floor(item["pr"])}%</div>
                      </Heading>
                      <FakeProgress></FakeProgress>
                      <Progress style={{ width: item["pr"] * 3 }}></Progress>
                    </div>
                  ) : (
                    ""
                  );
                });
              })}
            </TopItem>
            <TopCategory>
              <h3>Top Category</h3>
              {perVal.categoryVal.map((ctg) => {
                return (
                  <div style={{ marginBottom: "1rem" }}>
                    <Heading>
                      <div>{ctg["ctgry"]}</div>
                      <div>{Math.floor(ctg["pr"])}%</div>
                    </Heading>
                    <FakeProgress></FakeProgress>
                    <Progress style={{ width: ctg["pr"] * 3 }}></Progress>
                  </div>
                );
              })}
            </TopCategory>
          </Container>
          <Chart>
            <LineChart width={600} height={300} data={perVal.itemVal}>
              <Line type="monotone" dataKey="pr" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis  />
              <YAxis />
            </LineChart>
          </Chart>
        </WrapperA>
        {itemView.showShoppingItem ? (
          <ShowShoppingList showId={itemView.showId} />
        ) : (
          <AnalyticList />
        )}
      </Wrapper>
    </>
  );
};

export default Analytics;
