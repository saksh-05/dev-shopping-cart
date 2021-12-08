import dbConnect from "../../../lib/dbConnect";
import MenuList from "../../../models/Menu";
import CategoryList from "../../../models/Category";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: object;
  name: string;
  description: string;
  image: string;
  category: string;
};

dbConnect();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const menu = await MenuList.find({})
          .sort({ category: "1" })
          .sort({ name: "1" });
        const category = await CategoryList.find({}).sort({ category: 1 });
        console.log(menu);
        console.log(category);
        res
          .status(200)
          .json({ success: true, data: { menu: menu, category: category } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        /* create a new model in the database */
        // const menu = await MenuList.create(req.body.values);
        // res.status(201).json({ success: true, data: menu });
        const { name, note, image, category } = req.body.values;
        console.log(req.body.values.name);
        MenuList.findOne(
          {
            name,
          },
          async (err: Error, menu: any) => {
            if (!menu) {
              console.log("new item");
              const newItem = {
                name: name,
                note: note,
                image: image,
                category: category,
              };
              const newItemAdd = new MenuList(newItem);
              newItemAdd
                .save()
                .then(() =>
                  res.send({
                    status: true,
                    message: "item added",
                  })
                )
                .catch((err: Error) => res.status(400).json("Error: " + err));

              CategoryList.findOne(
                {
                  category,
                },
                (err: Error, ctgry: any) => {
                  if (err) {
                    console.log("Category Error", err);
                  } else if (!ctgry) {
                    try {
                      const newCtgry = {
                        category: category,
                      };
                      const newCategory = new CategoryList(newCtgry);
                      newCategory
                        .save()
                        .then(() => console.log("category added"))
                        .catch((err: Error) => console.log(err));
                    } catch (error) {
                      console.log("category save error", error);
                    }
                  } else {
                    console.log("category exist");
                  }
                }
              );
              // const menu = await MenuList.create(req.body.values);
              // res.status(201).json({ success: true, data: menu });
            } else if (menu) {
              console.log("item update");
              MenuList.findOneAndUpdate(
                { _id: menu.id },
                {
                  $set: {
                    name: name,
                    note: note,
                    image: image,
                    category: category,
                  },
                }
              )
                .then(() => {
                  console.log("List updated");
                  res.status(201).json({ success: true, data: "data updated" });
                })
                .catch((err: Error) => console.log(err));
              CategoryList.findOne(
                {
                  category,
                },
                (err: Error, ctgry: any) => {
                  if (err) {
                    console.log("Category Error", err);
                  } else if (!ctgry) {
                    try {
                      const newCtgry = {
                        category: category,
                      };
                      const newCategory = new CategoryList(newCtgry);
                      newCategory.save();
                    } catch (error) {
                      console.log("category save error", error);
                    }
                  } else {
                    console.log("category exist");
                  }
                }
              );
            } else {
              console.log("Add item error", err);
            }
          }
        );
      } catch (error) {
        console.log("error");
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
