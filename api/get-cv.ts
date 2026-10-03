import { get } from "@vercel/blob"

// Chemin du CV dans le store Blob PRIVÉ (à respecter lors de l'upload)
const CV_PATHNAME = "CV_Bouin_Mehdi.pdf"

async function verifyRecaptcha(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })
  const data = await res.json()
  return data.success === true
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" })
  }

  try {
    const { password, recaptchaToken } = req.body

    if (!recaptchaToken) {
      return res.status(400).json({ error: "reCAPTCHA manquant" })
    }

    const isHuman = await verifyRecaptcha(recaptchaToken)
    if (!isHuman) {
      return res.status(400).json({ error: "Vérification reCAPTCHA échouée" })
    }

    if (!password || password !== process.env.CV_PASSWORD) {
      return res.status(401).json({ error: "Mot de passe incorrect" })
    }

    const result = await get(CV_PATHNAME, { access: "private" })
    if (!result || result.statusCode !== 200) {
      return res.status(404).json({ error: "CV introuvable" })
    }
    const file = Buffer.from(await new Response(result.stream).arrayBuffer())

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Cache-Control", "private, no-store")
    res.setHeader("X-Content-Type-Options", "nosniff")
    res.setHeader("Content-Disposition", "attachment; filename=CV_Bouin_Mehdi.pdf")
    return res.status(200).send(file)
  } catch (error) {
    console.error("Erreur get-cv :", error)
    return res.status(500).json({ error: "Erreur serveur" })
  }
}