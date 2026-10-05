  
export interface CourseType {
  cid: string
  isEnrolled: boolean
  courseName: string
  slug: string
  coverUrl: string | null
  price: number
  description?: string
  category?: string 
  courseType?: string
}
