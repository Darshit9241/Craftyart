import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { encryptData } from "@/src/aes-crypto";
import { isFakeDomain } from "@/src/commonFunction/domain-checker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (isFakeDomain(req)) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const apiUrl = process.env.API_BASE_URL_1;

    const response = await axios.post(`${apiUrl}/api/getCountryCode`, {
      ip: req.body.ip,
    });

    res.status(200).json(encryptData(JSON.stringify(response.data)));
  } catch (error) {
     res.status(500).json({ error: "Internal Server Error" });
  }
}
