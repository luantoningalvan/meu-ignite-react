import { NextApiRequest, NextApiResponse } from "next";
import data from "../_data";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  res.send(data[id as string]);
}
