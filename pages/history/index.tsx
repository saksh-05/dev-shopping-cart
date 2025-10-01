import React, { useEffect, useState } from "react";
import { Header, ShowShoppingList, Shoppinglist } from "@components";
import GlobalStyle from "@styles/globalStyles";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import axios from "axios";
import styled from "styled-components";

const History: React.FC = () => {
  const itemView = useSelector((state: RootState) => state.toggle.itemView);
  const [resValue, setResValue] = useState([]);
  const [showDetailHistory, setShowDetailHistory] = useState(true);
  const [detailHistory, setDetailHistory] = useState({
    title: "",
    timestamps: "",
    itemId: [],
    categoryId: [],
  });
  const [allItem, setAllItem] = useState([]);
  console.log(detailHistory);

  useEffect(() => {
    const getHistoryList = async () => {
      await axios
        .get("/api/addList")
        .then((res) => {
          setResValue(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res) => {
          setAllItem(res.data.data.menu);
        })
        .catch((err) => console.log(err));
    };
    getMenuList();
    getHistoryList();
  }, [setResValue]);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Container>
          {showDetailHistory ? (
            <>
              <h2>Shopping History</h2>
              <HistoryValue>
                {resValue.map((val) => {
                  const timeSt: String = val["timestamps"];
                  return (
                    <div key={val["_id"] + "h"}>
                      <div
                        key={val["_id"]}
                        style={{
                          marginTop: "2rem",
                          marginBottom: "0.5rem",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {timeSt.split(" ")[1]} {timeSt.split(" ")[3]}
                      </div>
                      <HistoryTitle
                        key={val["_id"] + "a"}
                        onClick={() => {
                          setShowDetailHistory(false);
                          setDetailHistory(val);
                        }}
                      >
                        {val["title"]}
                        <div
                          key={val["_id"] + "b"}
                          style={{ display: "inline-flex", color: "#C1C1C4" }}
                        >
                          <Image
                            key={val["_id"] + "d"}
                            src="/icons/calendar.svg"
                            alt="calendar"
                            height="24"
                            width="24"
                          />
                          {val["timestamps"]}
                          <Progress key={val["_id"] + "c"}>
                            {val["progress"] === "true" ? (
                              <div
                                key={val["_id"] + "e"}
                                style={{
                                  border: "2px solid #56CCF2",
                                  borderRadius: " 0.5rem",
                                  width: "6rem",
                                  textAlign: "center",
                                  color: "#56CCF2",
                                }}
                              >
                                Completed
                              </div>
                            ) : (
                              <div
                                key={val["_id"] + "g"}
                                style={{
                                  border: "2px solid #EB5757",
                                  borderRadius: " 0.5rem",
                                  width: "6rem",
                                  textAlign: "center",
                                  color: "#EB5757",
                                }}
                              >
                                Cancelled
                              </div>
                            )}
                          </Progress>
                          <Image
                            key={val["_id"] + "f"}
                            src="/icons/arrow.svg"
                            alt="arrow"
                            width="24"
                            height="24"
                          />
                        </div>
                      </HistoryTitle>
                    </div>
                  );
                })}
              </HistoryValue>
            </>
          ) : (
            <DetailHistory>
              <div
                style={{
                  color: "#F9A109",
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 700,
                  justifyContent: "space-between",
                  width: "4rem",
                  cursor: "pointer",
                }}
                onClick={() => setShowDetailHistory(true)}
              >
                <Image
                  src="/icons/back.svg"
                  alt="back"
                  height="24"
                  width="24"
                />
                back
              </div>
              <h2>{detailHistory["title"]}</h2>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#C1C1C4",
                }}
              >
                <Image
                  src="/icons/calendar.svg"
                  alt="calendar"
                  height="24"
                  width="24"
                />
                {detailHistory["timestamps"]}
              </div>
              {Object.keys(detailHistory["categoryId"][0]).map((dt) => {
                return (
                  <div key={dt + "a"}>
                    <h3
                      key={dt}
                      style={{ marginBottom: "0.3rem", marginTop: "4rem" }}
                    >
                      {dt}
                    </h3>
                    {Object.keys(detailHistory["itemId"][0]).map((Id) => {
                      return allItem.map((itm) => {
                        return itm["category"] === dt && itm["_id"] === Id ? (
                          <div
                            key={itm["_id"] + "a"}
                            style={{ display: "inline" }}
                          >
                            <div
                              key={itm["_id"]}
                              style={{
                                boxShadow: "black 1px 1px 8px -5px",
                                minHeight: "4rem",
                                borderRadius: "0.5rem",
                                textAlign: "center",
                                display: " inline-flex",
                                alignItems: "center",
                                fontWeight: 500,
                                justifyContent: "space-between",
                                padding: "1rem",
                                marginRight: "1rem",
                                background: "white",
                              }}
                            >
                              {itm["name"]}
                              <div
                                key={itm["_id"] + "b"}
                                style={{
                                  marginLeft: "2rem",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  color: "#F9A10A",
                                }}
                              >
                                {detailHistory["itemId"][0][Id]}pcs{" "}
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      });
                    })}
                  </div>
                );
              })}
            </DetailHistory>
          )}
        </Container>
        {itemView.showShoppingItem ? <ShowShoppingList /> : <Shoppinglist />}
      </Wrapper>
    </>
  );
};

export default History;

const Wrapper = styled.div`
  display: inline-flex;
  width: 100%;
`;

const Container = styled.div`
  width: 71.2%;
  padding-left: 2rem;
`;
const HistoryValue = styled.div``;
const HistoryTitle = styled.div`
  height: 5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: black 1px 1px 8px -5px;
  width: 47rem;
  display: inline-flex;
  align-items: center;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  justify-content: space-between;
  cursor: pointer;
`;
const Progress = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const DetailHistory = styled.div`
  margin-top: 3rem;
`;
