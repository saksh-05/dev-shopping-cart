import React, { SyntheticEvent, useState } from "react";
import { Additem } from "@components";
import {
  WrapperB,
  WrapperA,
  Search,
  InputWrapper,
  BtnGroup,
  Category,
} from "./styled";
import Image from "next/image";
import { Formik, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";

import { RootState } from "@redux/reducers";

export const Shoppinglist: React.FC = () => {
  const shopVal = useSelector((state: RootState) => state.shoppinglist.shop);
  const [shop, setShop] = useState(false);
  const [category, setCategory] = useState("");
  const handleSubmit = () => {
    console.log("submit");
  };
  const handleCategory = (e: SyntheticEvent) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };
  return (
    <>
      {shopVal ? (
        <WrapperB>
          <h1>add item</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <form>
                <h4>Name</h4>
                <textarea
                  name="name"
                  placeholder="Enter a name"
                  style={{
                    height: "4rem",
                    width: "100%",
                    borderRadius: "0.5rem",
                    padding: "1.3rem",
                    fontSize: "1rem",
                  }}
                />
                <ErrorMessage name="name" component="div" />

                <h4>Note(optional)</h4>
                <textarea
                  name="note"
                  placeholder="Enter a note"
                  style={{
                    height: "8rem",
                    width: "100%",
                    borderRadius: "0.5rem",
                    padding: "1.3rem",
                    fontSize: "1rem",
                  }}
                ></textarea>
                <ErrorMessage name="note" component="div" />

                <h4>Image(optional)</h4>
                <textarea
                  name="image"
                  placeholder="Enter a url"
                  style={{
                    height: "4rem",
                    width: "100%",
                    borderRadius: "0.5rem",
                    padding: "1.3rem",
                    fontSize: "1rem",
                  }}
                />
                <ErrorMessage name="image" component="div" />

                <h4>Category</h4>
                <textarea
                  name="category"
                  value={category}
                  placeholder="Enter a category"
                  style={{
                    height: "4rem",
                    width: "100%",
                    borderRadius: "0.5rem",
                    padding: "1.3rem",
                    fontSize: "1rem",
                  }}
                  onChange={handleCategory}
                />
                <Category id="category" className="category">
                  <li
                    onClick={() => {
                      setCategory("all");
                    }}
                  >
                    all
                  </li>
                  <li
                    onClick={() => {
                      setCategory("category");
                    }}
                  >
                    category
                  </li>
                  <li
                    onClick={() => {
                      setCategory("like");
                    }}
                  >
                    like
                  </li>
                  <li
                    onClick={() => {
                      setCategory("beverage");
                    }}
                  >
                    beverage
                  </li>
                </Category>
                <ErrorMessage name="category" component="div" />

                <BtnGroup>
                  <input
                    type="reset"
                    value="Reset"
                    style={{
                      height: "3rem",
                      width: "6rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      fontFamily: "Quicksand",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  />
                  <input
                    type="submit"
                    value="Save"
                    style={{
                      height: "3rem",
                      width: "6rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      background: "#F9A109",
                      color: "white",
                      fontFamily: "Quicksand",
                      fontWeight: 700,
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  />
                </BtnGroup>
              </form>
            )}
          </Formik>
          {/* <h4>Name</h4>
          <textarea
            type="text"
            placeholder="Enter a name"
            style={{
              height: "4rem",
              width: "100%",
              borderRadius: "0.5rem",
              border: " 2px solid gray",
            }}
          />
          <h4>Note(optional)</h4>
          <textarea
            type="text"
            placeholder="Enter a note"
            style={{
              height: "8rem",
              width: "100%",
              borderRadius: "0.5rem",
              border: " 2px solid gray",
            }}
          ></textarea>
          <h4>Imgae(optional)</h4>
          <textarea
            type="text"
            placeholder="Enter a url"
            style={{
              height: "4rem",
              width: "100%",
              borderRadius: "0.5rem",
              border: " 2px solid gray",
            }}
          />
          <h4>Category</h4>
          <textarea
            type="text"
            placeholder="Enter a category"
            style={{
              height: "4rem",
              width: "100%",
              borderRadius: "0.5rem",
              border: " 2px solid gray",
            }}
          /> */}
        </WrapperB>
      ) : (
        <WrapperA>
          <Additem />
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
            Shopping List
            <Image src="/icons/edit.svg" alt="edit" height="30" width="30" />
          </div>
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
                }}
              />
            </InputWrapper>
          </Search>
        </WrapperA>
      )}
    </>
  );
};

export default Shoppinglist;
