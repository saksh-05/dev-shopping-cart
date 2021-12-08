import React, { useEffect, useState } from "react";
import {
  Wrapper,
  Container,
  HistoryValue,
  HistoryTitle,
  Progress,
  DetailHistory,
} from "./styled";
import { Header, ShowShoppingList, Shoppinglist } from "@components";
import GlobalStyle from "@styles/globalStyles";
import Image from "next/image";

import { useSelector } from "react-redux";

import { viewItem } from "@redux/actions";
import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";
import axios from "axios";
import { type } from "os";

const History: React.FC = () => {
  const itemView = useSelector((state: RootState) => state.toggle.itemView);
  const data = new Date();
  console.log(data.toDateString());
  const [resValue, setResValue] = useState([]);
  const [showDetailHistory, setShowDetailHistory] = useState(true);
  const [detailHistory, setDetailHistory] = useState([]);
  const [allItem, setAllItem] = useState([]);

  useEffect(() => {
    const getHistoryList = async () => {
      await axios
        .get("/api/addList")
        .then((res) => {
          console.log(res);
          setResValue(res.data.data);
          console.log(resValue);
        })
        .catch((err) => console.log(err));
    };
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res) => {
          console.log(res.data.data.menu);
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
                    <>
                      <div
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
                        onClick={() => {
                          setShowDetailHistory(false);
                          setDetailHistory(val);
                        }}
                      >
                        {val["title"]}
                        <div
                          style={{ display: "inline-flex", color: "#C1C1C4" }}
                        >
                          <Image
                            src="/icons/calendar.svg"
                            alt="calendar"
                            height="24"
                            width="24"
                          />
                          {val["timestamps"]}
                          <Progress>
                            {val['progress'] === 'true' ? (
                              <div
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
                            src="/icons/arrow.svg"
                            alt="arrow"
                            width="24"
                            height="24"
                          />
                        </div>
                      </HistoryTitle>
                    </>
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
              {console.log(detailHistory)}
              {console.log(allItem)}

              {console.log(Object.keys(detailHistory["categoryId"][0]))}
              {/* const categoryArray=detailHistory["categoryId"][0]; */}
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
                console.log(dt);
                return (
                  <>
                    <h3 style={{ marginBottom: "0.3rem", marginTop: "4rem" }}>
                      {dt}
                    </h3>
                    {Object.keys(detailHistory["itemId"][0]).map((Id) => {
                      console.log(Id);
                      console.log(detailHistory["itemId"][0][Id]);
                      return allItem.map((itm) => {
                        return itm["category"] === dt && itm["_id"] === Id ? (
                          <>
                            {console.log(itm)}
                            <div
                              style={{
                                boxShadow: "black 0px 4px 10px -3px",
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
                          </>
                        ) : (
                          <></>
                        );
                      });
                    })}
                  </>
                );
                // console.log(dt);
              })}
            </DetailHistory>
          )}
        </Container>
        {itemView.showShoppingItem ? (
          <ShowShoppingList showId={itemView.showId} />
        ) : (
          <Shoppinglist />
        )}
      </Wrapper>
    </>
  );
};

export default History;
