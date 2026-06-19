import { createFileRoute } from '@tanstack/react-router'

import { AuthFormError } from '#/features/auth/components/AuthFormError'
import { ModuleForm } from '#/features/admin/components/course/ModuleForm'
import { FormErrorsSummary } from '#/features/admin/components/course/FormFieldErrors'
import {
  adminActionButtonClassName,
  adminFrameClassName,
  adminPrimaryActionClassName,
} from '#/features/admin/constants/adminStyles'
import { useNewCourseForm } from '#/features/admin/hooks/useNewCourseForm'
import { cn } from '#/utils/cn'

export const Route = createFileRoute('/_protected/admin/dashboard/courses/new')({
  component: RouteComponent,
})

const inputClassName =
  'w-full rounded-xl border border-border bg-background p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const labelClassName = 'text-sm font-medium text-foreground'

function RouteComponent() {
  const { form, createCourseMutation, apiErrorMessage } = useNewCourseForm()

  const handleSubmit = (event: any) => {
    event.preventDefault()
    void form.handleSubmit();
  }

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-balance">Add New Course</h1>

      <form
        onSubmit={handleSubmit}
        className={`${adminFrameClassName} flex flex-col gap-6 rounded-xl p-6`}
        noValidate
      >
      <FormErrorsSummary form={form} />

      <form.Field name="title">
          {(field) => {
            const hasError = field.state.meta.errors.length > 0

            return (
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name} className={labelClassName}>
                  Title
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Enter course title…"
                  autoComplete="off"
                  aria-invalid={hasError ? true : undefined}
                  className={cn(
                    inputClassName,
                    hasError && 'border-destructive focus-visible:ring-destructive',
                  )}
                />
              </div>
            )
          }}
        </form.Field>

      <form.Field name="description"> 
        {(field) => {
          const hasError = field.state.meta.errors.length > 0
          return (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className={labelClassName}>
                Description
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Enter description…"
                autoComplete="off"
                className={cn(
                  inputClassName,
                  hasError && 'border-destructive focus-visible:ring-destructive',
                )}
              ></textarea>
            </div>
          )
        }}
      </form.Field>

        <form.Field name="price">
          {(field) => {
            const hasError = field.state.meta.errors.length > 0

            return (
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name} className={labelClassName}>
                  Price
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                  placeholder="0.00"
                  autoComplete="off"
                  aria-invalid={hasError ? true : undefined}
                  className={cn(
                    inputClassName,
                    'tabular-nums',
                    hasError && 'border-destructive focus-visible:ring-destructive',
                  )}
                />
              </div>
            )
          }}
        </form.Field>

        <form.Field name="image">
          {(field) => {
            const hasError = field.state.meta.errors.length > 0

            return (
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name} className={labelClassName}>
                  Image URL
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value ?? ''}
                  onChange={(event) =>
                    field.handleChange(
                      event.target.value.length > 0
                        ? event.target.value
                        : undefined,
                    )
                  }
                  placeholder="https://…"
                  autoComplete="off"
                  spellCheck={false}
                  aria-invalid={hasError ? true : undefined}
                  className={cn(
                    inputClassName,
                    hasError && 'border-destructive focus-visible:ring-destructive',
                  )}
                />
              </div>
            )
          }}
        </form.Field>

        <form.Field name="category">
          {(field) => {
            const hasError = field.state.meta.errors.length > 0

            return (
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name} className={labelClassName}>
                  Category
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Enter category…"
                  autoComplete="off"
                  aria-invalid={hasError ? true : undefined}
                  className={cn(
                    inputClassName,
                    hasError && 'border-destructive focus-visible:ring-destructive',
                  )}
                />
              </div>
            )
          }}
        </form.Field>

        <form.Field name="modules" mode="array">
          {(arrayField) => (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">Modules</p>
                <button
                  type="button"
                  onClick={() =>
                    arrayField.pushValue({
                      title: '',
                      order: arrayField.state.value.length + 1,
                      lessions: [],
                    })
                  }
                  className={adminActionButtonClassName}
                >
                  Add Module
                </button>
              </div>

              {arrayField.state.value.map((_, moduleIndex) => (
                <ModuleForm
                  key={moduleIndex}
                  form={form}
                  moduleIndex={moduleIndex}
                  onRemove={() => arrayField.removeValue(moduleIndex)}
                />
              ))}
            </div>
          )}
        </form.Field>

        <div className="flex flex-row justify-end gap-2">
          <button
            type="submit"
            disabled={createCourseMutation.isPending}
            className={adminPrimaryActionClassName}
          >
            {createCourseMutation.isPending ? 'Creating…' : 'Create Course'}
          </button>
          <button
            type="button"
            onClick={() => form.reset()}
            className={adminActionButtonClassName}
          >
            Cancel
          </button>

          <button type="button" onClick={() => console.log(form.state.values)}>Validate</button>
        </div>
      </form>

      
    </section>
  )
}
