import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'Not logged in' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    res.status(200).json(payload)
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
