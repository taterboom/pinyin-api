// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pinyin } from "@napi-rs/pinyin"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = ReturnType<typeof pinyin>

const optionsFields = ["heteronym", "style", "segment"]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const options = Object.fromEntries(
    optionsFields
      .map((field) => [field, req.query[field]])
      .filter((item) => !!item[1] && !Array.isArray(item[1]))
      .map(([field, _value]) => {
        let value = _value
        try {
          value = JSON.parse(_value as string)
        } catch (err) {
          //
        }
        return [field, value]
      })
  )
  if (!req.query.wd || Array.isArray(req.query.wd)) {
    res.status(404).end("no wd")
    return
  }
  const result = pinyin(req.query.wd, options)
  res.status(200).json(result)
}
