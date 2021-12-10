import React, { useState, SyntheticEvent, useEffect } from "react";
import { WrapperB, BtnGroup, Category } from "./styled";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import axios from "axios";
import { addItem } from "@redux/actions";
import { useAppDispatch } from "@redux/store";

export const ListForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [ctgry, setCtgry] = useState([]);
  const ShoppingSchema = Yup.object().shape({
    name: Yup.string().max(30, "Too Long").required("Required"),
    category: Yup.string()
      .max(120, "Too long, max 120 character")
      .required("Required"),
  });

  useEffect(() => {
    const getMenuList = async () => {
      await axios
        .get("/api/menuList")
        .then((res) => {
          setCtgry(res.data.data.category);
        })
        .catch((err) => console.log(err));
    };

    getMenuList();
  }, [setCtgry]);
  return (
    <WrapperB>
      <h1>Add a new item</h1>
      <Formik
        initialValues={{
          name: "",
          note: "",
          image: "",
          category: "",
        }}
        validationSchema={ShoppingSchema}
        onSubmit={async (values, action) => {
          await axios
            .put("/api/menuList", {
              values,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          dispatch(addItem());
          action.setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <h4>Name</h4>
            <Field
              name="name"
              as="textarea"
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
            <Field
              name="note"
              as="textarea"
              placeholder="Enter a note"
              style={{
                height: "8rem",
                width: "100%",
                borderRadius: "0.5rem",
                padding: "1.3rem",
                fontSize: "1rem",
              }}
            ></Field>
            <ErrorMessage name="note" component="div" />

            <h4>Image(optional)</h4>
            <Field
              name="image"
              as="textarea"
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
            <Field
              name="category"
              as="textarea"
              placeholder="Enter a category"
              style={{
                height: "4rem",
                width: "100%",
                borderRadius: "0.5rem",
                padding: "1.3rem",
                fontSize: "1rem",
                overflow: "hidden",
              }}
            />

            <Category className="category">
              {ctgry
                .filter((val) => {
                  const ct: string = val["category"];
                  if (values.category === "") return val;
                  else if (
                    ct.toLowerCase().includes(values.category.toLowerCase())
                  )
                    return val;
                })
                .map((ctg) => {
                  return (
                    <li
                      onClick={() => setFieldValue("category", ctg["category"])}
                    >
                      {ctg["category"]}
                    </li>
                  );
                })}
            </Category>
            <ErrorMessage name="category" component="div" />

            <BtnGroup>
              <input
                type="reset"
                value="Cancel"
                style={{
                  height: "3rem",
                  width: "6rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => dispatch(addItem())}
              />
              <input
                type="submit"
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
              />
            </BtnGroup>
          </Form>
        )}
      </Formik>
    </WrapperB>
  );
};
