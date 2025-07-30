import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: { email, password: hashed },
    })
    res.status(200).json({ message: 'User registered' })
  } catch (err) {
    res.status(500).json({ error: 'Email already in use' })
  }
}
