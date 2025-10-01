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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const menu = await MenuList.find({}).sort({ category: 1, name: 1 });

        const category = await CategoryList.find({}).sort({ category: 1 });
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
        const { name, note, image, category } = req.body.values;
        const menu = await MenuList.findOne({ name });
        if (!menu) {
          console.log("new item");

          const newItem = new MenuList({ name, note, image, category });
          await newItem.save();

          res.send({
            status: true,
            message: "item added",
          });

          // Check and add category if not exists
          let ctgry = await CategoryList.findOne({ category });
          if (!ctgry) {
            try {
              const newCategory = new CategoryList({ category });
              await newCategory.save();
              console.log("category added");
            } catch (error) {
              console.log("category save error", error);
            }
          } else {
            console.log("category exist");
          }
        } else {
          // Update existing menu item
          await MenuList.findOneAndUpdate(
            { _id: menu._id },
            { $set: { name, note, image, category } }
          );

          res.status(201).json({ success: true, data: "data updated" });

          // Check and add category if not exists
          let ctgry = await CategoryList.findOne({ category });
          if (!ctgry) {
            try {
              const newCategory = new CategoryList({ category });
              await newCategory.save();
              console.log("category added");
            } catch (error) {
              console.log("category save error", error);
            }
          } else {
            console.log("category exist");
          }
        }
      } catch (error) {
        console.log("error", error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
