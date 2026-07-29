import { Button } from "#/features/shared/button/components/Button";
import { Link, type ErrorComponentProps } from "@tanstack/react-router";
import { getValidationErrorMessage, parseValidationError } from "@tanstack-start-hono/validators/validation";

export function CourseError({ error, reset }: ErrorComponentProps) {
  const parsedError = parseValidationError(error);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-4">
      { 
        parsedError ? (
          <>
            <h1 className="text-2xl font-bold">Error Occurred</h1>
            <p className="text-gray-500">{parsedError.message}</p>
            <Link to="/dashboard/courses" search={{page: 1}} className="bg-primary text-white px-4 py-2 rounded-md">
            Go back
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Error loading courses</h1>
            <p className="text-gray-500">{getValidationErrorMessage(error)}</p>
            <Button onClick={reset} className="bg-primary text-white px-4 py-2 rounded-md">
              Reset
            </Button>
          </>
        )
      }
      

    </div>
  )
}