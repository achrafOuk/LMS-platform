import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import {
  adminActionButtonClassName,
  adminDestructiveButtonClassName,
  adminDialogClassName,
  adminFrameClassName,
  adminPrimaryActionClassName,
  adminTableHeadClassName,
  adminTableRowClassName,
} from '#/features/admin/constants/adminStyles'
import { formatCoursePrice } from '../constants/formatCoursePrice'
import type { CourseType } from '../types/Course'
import { Link } from '@tanstack/react-router'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'

interface AdminCoursesTableProps {
  initialCourses: CourseType[]
}

export function AdminCoursesTable({ initialCourses }: AdminCoursesTableProps) {
  const [courseToDelete, setCourseToDelete] = useState<CourseType | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  function openDeleteDialog(course: CourseType) {
    setCourseToDelete(course)
    dialogRef.current?.showModal()
  }

  function closeDeleteDialog() {
    dialogRef.current?.close()
    setCourseToDelete(null)
  }

  function confirmDelete() {
    if (!courseToDelete) return

    // delete course will be here
    closeDeleteDialog()
  }

  return (
    <>
      <section className="flex flex-col gap-6">
        <AdminPageHeader title="Manage Courses">
          <Link
            to="/admin/dashboard/courses/new"
            className={adminPrimaryActionClassName}
          >
            <Plus className="size-4" aria-hidden />
            Add Course
          </Link>
        </AdminPageHeader>

        {initialCourses.length === 0 ? (
          <div
            className={`${adminFrameClassName} flex flex-col items-center gap-4 px-6 py-12 text-center`}
          >
            <p className="text-muted-foreground">
              No courses yet. Create your first course to get started.
            </p>
            
          </div>
        ) : (
          <div className={`overflow-x-auto ${adminFrameClassName}`}>
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Courses managed in the admin panel</caption>
              <thead className={adminTableHeadClassName}>
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Thumbnail
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {initialCourses.map((course) => (
                  <tr key={course.slug} className={adminTableRowClassName}>
                    <td className="px-4 py-3">
                      <div className="size-14 shrink-0 overflow-hidden bg-muted">
                        <img
                          src={course.coverUrl || ''}
                          alt=""
                          width={56}
                          height={56}
                          className="size-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="max-w-xs px-4 py-3">
                      <span className="block truncate font-medium text-foreground">
                        {course.courseName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {course.category}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-foreground">
                      {formatCoursePrice(course.price)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to="/admin/dashboard/courses/$slug/edit"
                          params={{ slug: course.slug }}
                          className={adminActionButtonClassName}
                        >
                          <Pencil className="size-4" aria-hidden />
                          Edit
                        </Link>
                        <button
                          type="button"
                          className={adminDestructiveButtonClassName}
                          onClick={() => openDeleteDialog(course)}
                        >
                          <Trash2 className="size-4" aria-hidden />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <dialog
        ref={dialogRef}
        className={adminDialogClassName}
        aria-labelledby="delete-course-title"
        onClose={() => setCourseToDelete(null)}
      >
        <h2 id="delete-course-title" className="text-lg font-semibold text-foreground">
          Delete course?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {courseToDelete
            ? `"${courseToDelete.courseName}" will be removed. This action cannot be undone.`
            : 'This action cannot be undone.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className={adminActionButtonClassName}
            onClick={closeDeleteDialog}
          >
            Cancel
          </button>
          <button
            type="button"
            className={adminDestructiveButtonClassName}
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </dialog>
    </>
  )
}
