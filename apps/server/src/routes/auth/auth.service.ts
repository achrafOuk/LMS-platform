import bcrypt from "bcrypt";
import { DatabaseError } from "pg";

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