// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pinyin } from "@napi-rs/pinyin"
import Cors from "cors"
import type { NextApiRequest, NextApiResponse } from "next"

// folked from https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
})

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

type Data = ReturnType<typeof pinyin>

const optionsFields = ["heteronym", "style", "segment"]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await runMiddleware(req, res, cors)
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
