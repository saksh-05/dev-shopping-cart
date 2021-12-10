import dbConnect from "../../../lib/dbConnect";
import History from "../../../models/History";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const CompleteList = await History.find({});
        res.status(200).json({ success: true, data: CompleteList });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const CompleteList = await History.create(req.body);
        res.status(201).json({ success: true, data: CompleteList });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
