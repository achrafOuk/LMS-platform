import { ModuleForm } from '#/features/admin/components/course/ModuleForm'
import type { CourseFormApi } from '#/features/admin/types/courseForm'
import { adminActionButtonClassName } from '#/features/admin/constants/adminStyles'
import { cn } from '#/utils/cn'
import { UploadImage } from '../../upload/components/UploadImage'
import { getMediaUrl } from '#/utils/getMedia'
import { useEffect, useState } from 'react'

const inputClassName =
  'w-full rounded-xl border border-border bg-background p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const labelClassName = 'text-sm font-medium text-foreground'

type CourseFormFieldsProps = {
  form: CourseFormApi
}


export function CourseFormFields({ form }: CourseFormFieldsProps) {
  return (
    <>
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
              />
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
            <UploadImage
              value={field.state.value}
              onChange={field.handleChange}
              hasError={hasError}
            />
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

    </>
  )
}
