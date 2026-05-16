export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { password } = req.body;
  if (password === (process.env.ADMIN_PASSWORD || 'admin123')) {
    res.status(200).json({ success: true, token: "demo-jwt-token-123" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}
