import { Button } from "#/features/shared/button/components/Button";
import { Input } from "#/features/shared/input/components/Input";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from '@tanstack/react-form'
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGetTags } from "#/features/courses/hooks/useGetTags";

export function Searchbar() {
  const navigate = useNavigate({ from: '/dashboard/courses/' })

  const { data: tags } = useSuspenseQuery(useGetTags());

  const form = useForm({
    defaultValues: {
      course: '',
      types: [] as string[],
    },

    onSubmit: async ({ value }) => {
      await navigate({
        search: (prev) => ({
          ...prev,
          course: value.course,
          types: value.types,
        }),
      })
    },
  })

  return (
    <aside className="w-1/4 p-4">
      <p>Search for courses</p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="flex flex-col gap-4">
          {/* Search input */}
          <form.Field name="course">
            {(field) => (
              <div>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Search courses"
                  className="w-full"
                />
              </div>
            )}
          </form.Field>

          {/* Tags */}
          <form.Field name="types">
            {(field) => (
              <div className="flex flex-col gap-2">
                {tags.map((tag) => {
                  const checked = field.state.value.includes(tag.tagName)

                  return (
                    <label key={tag.tid} className="flex flex-row gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.handleChange([
                              ...field.state.value,
                              tag.tagName,
                            ])
                          } else {
                            field.handleChange(
                              field.state.value.filter(
                                (value) => value !== tag.tagName,
                              ),
                            )
                          }
                        }}
                      />

                      {tag.tagName}
                    </label>
                  )
                })}
              </div>
            )}
          </form.Field>

          <Button
            type="submit"
            variant="primary"
            className="w-full rounded-none"
          >
            Search
          </Button>
        </div>
      </form>
    </aside>
  )
}