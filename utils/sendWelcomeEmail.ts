import sendWelcomeEmail from "../utils/sendWelcomeEmail"

export const verifyEmail = async (req: Request, res: Response): Promise<any> => {
  const { token } = req.query
  if (!token) return res.status(400).send("<h2>Missing token</h2>")

  try {
    const decoded: any = jwt.verify(token as string, JWT_SECRET)
    const user = await User.findOne({ email: decoded.email })
    if (!user) return res.status(400).send("<h2>User not found</h2>")
    if (user.isVerified) return res.status(400).send("<h2>User is already verified</h2>")

    user.isVerified = true
    await user.save()

    // Send the welcome email
    await sendWelcomeEmail(
      user.email,
      "Welcome to Tech Connect – Your Social Hub Awaits!",
      `Hey ${user.fullname},\n\nWelcome to Tech Connect! You’ve just joined a thriving community where ideas spark, conversations flow, and connections are made.\n\nAt Tech Connect, you can:\n💬 Share your thoughts – Post updates, ideas, and insights.\n🤝 Connect with others – Follow like-minded people and grow your network.\n📢 Engage in conversations – Join trending discussions and express yourself.\n✨ Stay updated – Get real-time updates from people who matter to you.\n\nYour journey starts now! 🚀\n\n👉 Complete your profile to let others know who you are.\n👉 Start posting and engage with the community.\n👉 Follow interesting people to personalize your feed.\n\nWe’re excited to have you on board. If you have any questions or need help, feel free to reach out.\n\nLet’s make Tech Connect an amazing space together!\n\nHappy posting,\nThe Tech Connect Team`
    )

    res.status(200).send("<h2>Email verified successfully</h2>")
  } catch (error) {
    console.error(error)
    res.status(500).send("<h2>Failed to verify user</h2>")
  }
}