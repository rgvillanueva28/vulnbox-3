// pages/api/get-flag.js or app/api/get-flag/route.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  // In a real app, you'd perform a JWT verification and role check here.
  // For this example, we assume the user is authorized.

  const isAuthorized = true; // Replace with actual auth logic

  if (!isAuthorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get the flag from a secure environment variable
  const flag = "ORION{CVE-2025-29927}";

  return res.status(200).json({ flag });
}