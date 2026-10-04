import jwt, { SignOptions } from "jsonwebtoken"

interface JwtPayload {
 userId: string
 role: string
}

const getJwtSecret = (): string => {
 const secret = process.env.JWT_SECRET

 if (!secret) {
  throw new Error("JWT_SECRET is not configured")
 }

 return secret
}

export const generateAccessToken = (
 payload: JwtPayload,
 expiresIn: SignOptions["expiresIn"] = "1d"
): string => {
 return jwt.sign(payload, getJwtSecret(), { expiresIn })
}

export const verifyAccessToken = (token: string): JwtPayload => {
 return jwt.verify(token, getJwtSecret()) as JwtPayload
}