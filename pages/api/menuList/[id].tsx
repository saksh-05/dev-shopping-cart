import dbConnect from "../../../lib/dbConnect";
import Menu from "../../../models/Menu";
import Category from "../../../models/Category";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const menu = await Menu.findById(id);
        if (!menu) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: menu });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const menu = await Menu.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!menu) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: menu });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deleteMenuItem = await Menu.findOne({ _id: id });
        const allMenuItem = await Menu.find({});
        let cnt = 0;
        allMenuItem.map((itm: typeof allMenuItem) => {
          if (itm.category === deleteMenuItem.category) {
            cnt = cnt + 1;
          }
        });
        if (cnt === 1) {
          const deleteCategory = await Category.deleteOne({
            category: deleteMenuItem.category,
          });
        }
        const deletedMenu = await Menu.deleteOne({ _id: id });

        if (!deletedMenu) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: { deleteMenuItem } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
