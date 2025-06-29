// pages/api/reset-password.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import payload from 'payload'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Initialize Payload if not already initialized
    if (!payload.isInitialized) {
      await payload.init({
        secret: process.env.PAYLOAD_SECRET!,
        mongoURL: process.env.DATABASE_URI!,
        local: true,
      })
    }
    
    // Update user password
    const result = await payload.update({
      collection: 'users',
      id: '684de8b94b8fed593be2253', // Your user ID
      data: {
        password: 'newpassword123', // Your new password
      },
    })

    res.status(200).json({ message: 'Password reset successfully!', result })
  } catch (error: any) {
    console.error('Error:', error)
    res.status(500).json({ error: error.message })
  }
}