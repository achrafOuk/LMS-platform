import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { DatabaseError } from "pg";
import "../../env";

export const AUTH_COOKIE_NAME = "auth_token";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not set");
    }
    return new TextEncoder().encode(secret);
}

export async function signAccessToken(user: {
    uid: string;
    email: string;
    role: string;
}) {
    return new SignJWT({ email: user.email, role: user.role })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(user.uid)
        .setIssuedAt()
        .setExpirationTime(`${AUTH_COOKIE_MAX_AGE}s`)
        .sign(getJwtSecret());
}

export async function verifyAccessToken(token: string) {
    const { payload } = await jwtVerify(token, getJwtSecret());

    if (
        !payload.sub ||
        typeof payload.email !== "string" ||
        typeof payload.role !== "string"
    ) {
        throw new Error("Invalid token payload");
    }

    return {
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
    };
}

export function getAuthCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: AUTH_COOKIE_MAX_AGE,
    };
}

export async function EncryptPassword(password:string) {
    return await bcrypt.hash(password, 10);
}

export async function compareUserPassword(password:string, userPassword:string)
{
    return await bcrypt.compare(password, userPassword);
}

export async function checkUniqueViolation(error: Error) {
    let messages = [];
    if (error instanceof DatabaseError && error.code === "23505") // unique_violation
    {
        if (error.constraint?.includes("email"))
        {
            messages.push( "Email already in use");
        }
        if (error.constraint?.includes("username"))
        {
            messages.push( "Username already in use");
        }
    }
    return messages;
}