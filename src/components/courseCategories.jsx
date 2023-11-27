import { Suspense } from "react";
import { httpInterceptedService } from "../core/http-service";
import { Await, defer, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

export default function CourseCategories() {
    const data = useLoaderData();
    const triangle = <FontAwesomeIcon icon={faCaretLeft} />

    return (
        <div className="course-categories">
            <ul>
                <Suspense fallback={<h2>در حال دریافت اطلاعات...</h2>}>
                    <Await resolve={data.courseCategories}>
                        {(loadCourseCategories) => {
                            return loadCourseCategories.map((courseCategory) => {
                                const { id, name } = courseCategory
                                return (
                                    <li key={id}>
                                        <i>{triangle}</i>
                                        <h2>{name}</h2>
                                    </li>
                                )
                            })
                        }}
                    </Await>
                </Suspense>
            </ul>
        </div>
    )
}

export async function courseCategoriesLoader() {
    return defer({
        courseCategories: loadCourseCategories(),
    })
}
const loadCourseCategories = async() => {
    const response = await httpInterceptedService.get("/CourseCategory/sieve");
    // console.log(response.data.data)
    return response.data.data
}