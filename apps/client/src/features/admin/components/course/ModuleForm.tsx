import type { CourseFormApi } from '#/features/admin/types/courseForm'

import { cn } from '#/utils/cn'

import {  adminActionButtonClassName,
  adminDestructiveButtonClassName,
  adminFrameClassName,
} from '../../constants/adminStyles'
import { TitleWithEditToggle } from './TitleWithEditToggle'

const inputClassName =
  'w-full rounded-xl border border-border bg-background p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const labelClassName = 'text-sm font-medium text-foreground'

type LessonFormProps = {
  form: CourseFormApi
  moduleIndex: number
  lessonIndex: number
  onRemove: () => void
}

export function LessonForm({
  form,
  moduleIndex,
  lessonIndex,
  onRemove,
}: LessonFormProps) {
  const titleFieldName =
    `modules[${moduleIndex}].lessions[${lessonIndex}].title` as `modules[${number}].lessions[${number}].title`
  const videoLinkFieldName =
    `modules[${moduleIndex}].lessions[${lessonIndex}].videoLink` as `modules[${number}].lessions[${number}].videoLink`

  return (
    <article
      className={`${adminFrameClassName} flex flex-col gap-4 rounded-xl p-4`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          Lesson {lessonIndex + 1}
        </p>
        <button
          type="button"
          onClick={onRemove}
          className={adminDestructiveButtonClassName}
        >
          Remove Lesson
        </button>
      </div>

      <form.Field name={titleFieldName}>
        {(field) => (
          <TitleWithEditToggle
            field={field}
            editAriaLabel="Edit lesson title"
            placeholder="Enter lesson title…"
            fallbackLabel={`Lesson ${lessonIndex + 1}`}
          />
        )}
      </form.Field>

      <form.Field name={videoLinkFieldName}>
        {(field) => {
          const hasError = field.state.meta.errors.length > 0

          return (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className={labelClassName}>
                Video Link
              </label>
              <input
                id={field.name}
                name={field.name}
                type="url"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
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
      </form.Field>    </article>
  )
}

type ModuleFormProps = {
  form: CourseFormApi
  moduleIndex: number
  onRemove: () => void
}

export function ModuleForm({ form, moduleIndex, onRemove }: ModuleFormProps) {
  const titleFieldName =
    `modules[${moduleIndex}].title` as `modules[${number}].title`
  const lessionsFieldName =
    `modules[${moduleIndex}].lessions` as `modules[${number}].lessions`
  return (
    <article
      className={`${adminFrameClassName} flex flex-col gap-4 rounded-xl p-4`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">
          Module {moduleIndex + 1}
        </p>
        <button
          type="button"
          onClick={onRemove}
          className={adminDestructiveButtonClassName}
        >
          Remove Module
        </button>
      </div>

      <form.Field name={titleFieldName}>
        {(field) => (
          <TitleWithEditToggle
            field={field}
            editAriaLabel="Edit module title"
            placeholder="Enter module title…"
            fallbackLabel={`Module ${moduleIndex + 1}`}
          />
        )}
      </form.Field>

      

      <form.Field name={lessionsFieldName} mode="array">
        {(lessonsField) => (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">Lessons</p>
              <button
                type="button"
                onClick={() =>
                  lessonsField.pushValue({
                    title: '',
                    videoLink: '',
                    order: (lessonsField.state.value?.length ?? 0) + 1,
                  })
                }
                className={adminActionButtonClassName}
              >
                Add Lesson
              </button>
            </div>

            {lessonsField.state.value?.map((_, lessonIndex) => (              <LessonForm
                key={lessonIndex}
                form={form}
                moduleIndex={moduleIndex}
                lessonIndex={lessonIndex}
                onRemove={() => lessonsField.removeValue(lessonIndex)}
              />
            ))}
          </div>
        )}
      </form.Field>
    </article>
  )
}
