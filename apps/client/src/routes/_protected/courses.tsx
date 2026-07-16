import { CourseGrid } from '#/features/courses/components/CourseGrid'
import { featuredCourses } from '#/features/courses/constants/featuredCourses'
import { Input } from '#/features/shared/input/components/Input';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/courses')({
  component: CoursesPage,
})

function CoursesPage() {
  const tags = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'];
  return (
    <div className="mx-auto  px-4 py-16  flex flex-col gap-10">
      <h1 className="font-serif text-3xl font-medium text-foreground text-center">
        Browse courses
      </h1>
      <div className="flex flex-row gap-10">
        <aside className="w-1/4 flex flex-col gap-4">
          <p>Seach courses</p>
          <div className="flex flex-row gap-2">
            <Input placeholder="Search courses" className="w-full" />
          </div>
          <div className="flex flex-col gap-2"> 
            {
              tags.map((tag) => (
                <div key={tag} className="flex flex-row gap-2">
                <input type="checkbox" name={tag} id={tag} />
                <label key={tag} >{tag}</label>
                </div>
              ))
            }
            
          </div>

          <button type="button" className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer">Search</button>
        </aside>
        <CourseGrid courses={featuredCourses} />
      </div>
    </div>
  )
}
