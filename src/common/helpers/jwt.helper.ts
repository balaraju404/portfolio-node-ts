import jwt from "jsonwebtoken"
import { UserRole } from "../../modules/user/user.model.js"
import { config } from "../../config/config.js"

interface JwtPayload {
 userId: string
 role: UserRole
}

export const generateAccessToken = (payload: JwtPayload): string => {
 const { secret, expiresIn } = config.jwt
 return jwt.sign(payload, secret, { expiresIn })
}

export const verifyAccessToken = (token: string): JwtPayload => {
 return jwt.verify(token, config.jwt.secret) as JwtPayload
}