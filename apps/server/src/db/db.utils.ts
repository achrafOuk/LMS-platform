

// todo: move to global utils


function hasProperty<T extends object>(some:T, key:PropertyKey): key is keyof T
{
  return  some != null && some instanceof Object && key in some;
}

export function checkViolation(error: unknown) 
{
    console.log('error in checkViolation:',error);
    if (error == null ) return error;
    if (hasProperty(error, 'cause'))
    {
        let cause = (error as { cause: object }).cause;
        if (hasProperty(cause, 'code') && hasProperty(cause, 'constraint')) 
        {
            let err = cause as { code: string, constraint: string };
            if (err.code === "23505" && err.constraint)
            return err.constraint;
        }
    }

    return null;
}


export function formatViolationErrorMessage(error: string)
{
    if (error == null ) return error;
    switch (error)
    {
        case "course_course_name_unique":
            return "Course name already in use";
        case "user_username_unique":
            return "Username already in use";
        case "user_email_unique":
            return "Email already in use";
        default:
            return error;
    }
}