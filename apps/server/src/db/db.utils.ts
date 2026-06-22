import { DatabaseError } from "pg";

export function checkViolation(error: unknown) 
{
    if (error instanceof DatabaseError && error.code === "23505" && error.constraint) // unique_violation
    {
        return error.constraint;
    }
    return null;
}
