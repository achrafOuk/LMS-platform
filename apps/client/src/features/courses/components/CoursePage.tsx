import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "#/features/shared/accordoin/components/accordion";
import { Button } from "#/features/shared/button/components/Button";
import { orpc } from "#/utils/orpc"
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type courseType = Awaited<ReturnType<typeof orpc.courses.getCourse>>

const ImageComponent = ({ url }: { url: string | null }) => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, isLoading] = useState<boolean >(false);

    useEffect(() =>{
        if (!url) return ;
        const LoadImage = async () => {
            isLoading(true);
            try
            {
                const response = await orpc.media.getMediaUrl({ filename: url });
                setImage(response.url);
            }
            catch (error)
            {
                console.error(error);
            }
            finally
            {
                isLoading(false);
            }
        }
        LoadImage();

    }, [url])

    if (!image)
        return (<></>)
    if (loading)
        return (<>Loading...</>)
    return (
        <img src={image} alt="Course Image" className="w-full h-[300px] " />
    )
}

function LessonList({ lessons }: { lessons: courseType['modules'][number]['lessons'] })
{
    return (
        <>
        {
            lessons.map((lesson, index:number) => (
                <div key={lesson.orderIndex} >
                    {/* <Link href={`/courses/${lesson.lhid}`}> */}
                    <Link to={`/courses/$id`} params={{ id: lesson.leid }}>
                            {index + 1} . {lesson.title}
                    </Link>
                </div>
            ))
        }
        </>
    )
}


export function ModuleList({ modules }: { modules: courseType['modules'] })
{
    console.log(modules);
    return (
        <Accordion>
            {modules?.map((module,index:number) => (
                <AccordionItem key={module.mhid} >
                    <AccordionHeader index={index} >{module.title}</AccordionHeader>
                    <AccordionContent index={index} >
                        <LessonList lessons={module.lessons} />
                    </AccordionContent>
                    
                </AccordionItem>
                
            ))}
        </Accordion>
    )

}

export function CoursePage({ course }: { course: courseType })
{
    const  img = 'https://www.entrepreneur.com/wp-content/uploads/sites/2/2014/10/1413823428-amazingly-free-stock-websites.jpg';
    return (
        <main className="flex flex-col md:flex-row gap-4 h-screen min-h-screen p-4">
            <section className="flex flex-col gap-4 md:w-[80%]">
                <h1 className="text-2xl font-bold">{course.courseName}</h1>
                {/* <img src={course.coverUrl ?? img} alt={course.courseName} className="w-full h-full object-cover" /> */}
                <ImageComponent url={course.coverUrl ?? null} />
                <p className="text-sm text-gray-500">{course.description}</p>
                <ModuleList modules={course.modules} />
            </section>

            <section className="flex flex-col gap-4 md:w-[20%] bg-card p-4 rounded-md">
                <p className="text-sm text-gray-500">price:${course.price}</p>
                <Button variant="primary">
                    Enroll Now
                </Button>
            </section>
        </main>
    )
}