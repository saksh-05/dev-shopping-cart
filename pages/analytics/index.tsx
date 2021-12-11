import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, ShowShoppingList, AnalyticList } from "@components";
import GlobalStyle from "@styles/globalStyles";
import { useSelector } from "react-redux";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { RootState } from "@redux/reducers";
import styled from "styled-components";

const Analytics: React.FC = () => {
  const itemView = useSelector((state: RootState) => state.toggle.itemView);
  const [val, setVal] = useState({
    category: [],
    allItems: [],
  });

  const [perVal, setPerVal] = useState({
    categoryVal: Array(),
    itemVal: Array(),
  });
  const itemArray = useSelector(
    (state: RootState) => state.itemCounter.itemArray
  );
  const itmCtgry = useSelector(
    (state: RootState) => state.itemCounter.itemCategory
  );
  const categoryKeys = Object.keys(itmCtgry);
  const categoryValue = Object.values(itmCtgry);
  const itemKeys = Object.keys(itemArray);
  const itemValue = Object.values(itemArray);
  const totalCategoryValue = categoryValue.reduce(function (acc, vl) {
    return acc + vl;
  }, 0);
  const totalItemValue = itemValue.reduce((itm, val) => {
    return itm + val;
  }, 0);
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
    return a["pr"] > b["pr"] ? -1 : b["pr"] > a["pr"] ? 1 : 0;
  });
  perVal.itemVal.sort((a, b) => {
    return a["pr"] > b["pr"] ? -1 : b["pr"] > a["pr"] ? 1 : 0;
  });
  if (perVal.categoryVal.length > 3) {
    perVal.categoryVal = perVal.categoryVal.slice(0, 3);
  }
  if (perVal.itemVal.length > 3) {
    perVal.itemVal = perVal.itemVal.slice(0, 3);
  }

  useEffect(() => {
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res) => {
          setVal({
            ...val,
            allItems: res.data.data.menu,
            category: res.data.data.category,
          });
        })
        .catch((err) => console.log(err));
    };

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
                return val.allItems.map((Litem) => {
                  return Litem["_id"] === item["itm"] ? (
                    <div key={Litem["_id"]} style={{ marginBottom: "1rem" }}>
                      <Heading
                        key={Litem["_id"] + "a"}
                        style={{ width: "69%" }}
                      >
                        <div>{Litem["name"]}</div>
                        <div>{Math.floor(item["pr"])}%</div>
                      </Heading>
                      <FakeProgress key={Litem["_id"] + "b"}></FakeProgress>
                      <Progress
                        key={Litem["_id"] + "c"}
                        style={{ width: item["pr"] * 3 }}
                      ></Progress>
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
                  <div key={ctg["_id"]} style={{ marginBottom: "1rem" }}>
                    <Heading key={ctg["_id"] + "a"}>
                      <div>{ctg["ctgry"]}</div>
                      <div>{Math.floor(ctg["pr"])}%</div>
                    </Heading>
                    <FakeProgress key={ctg["_id"] + "b"}></FakeProgress>
                    <Progress
                      key={ctg["_id"] + "c"}
                      style={{ width: ctg["pr"] * 3 }}
                    ></Progress>
                  </div>
                );
              })}
            </TopCategory>
          </Container>
          <Chart>
            <LineChart width={600} height={300} data={perVal.itemVal}>
              <Line type="monotone" dataKey="pr" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis />
              <YAxis />
            </LineChart>
          </Chart>
        </WrapperA>
        {itemView.showShoppingItem ? <ShowShoppingList /> : <AnalyticList />}
      </Wrapper>
    </>
  );
};

export default Analytics;

const Wrapper = styled.div`
  display: inline-flex;
  width: 100%;
`;

const WrapperA = styled.div``;
const Container = styled.div`
  padding-left: 2rem;
  display: inline-flex;
  margin-bottom: 4rem;
`;
const Search = styled.div``;

const TopItem = styled.div`
  width: 25rem;
`;
const TopCategory = styled.div`
  width: 24rem;
`;

const Heading = styled.div`
  display: inline-flex;
  justify-content: space-between;
  font-size: 14px;
  width: 72%;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FakeProgress = styled.div`
  background: #e0e0e0;
  height: 0.5rem;
  position: absolute;
  z-index: -1;
  width: 22%;
  border-radius: 0.5rem;
`;

const Progress = styled.div`
  height: 0.5rem;
  background: #56ccf2;
  border-radius: 0.5rem;
`;

const Chart = styled.div``;
