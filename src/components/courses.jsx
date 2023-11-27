import { Await, defer, useLoaderData } from "react-router-dom";
import { httpInterceptedService } from "../core/http-service";
import { Suspense } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Courses() {
    const data = useLoaderData();
    const star = <FontAwesomeIcon icon={faStar} />

    return (
        <div className="courses-list">
            <ul>
                <Suspense fallback={<h2>در حال دریافت اطلاعات...</h2>}>
                    <Await resolve={data.courses}>
                        {(loadCourses) => {
                            return loadCourses.map((course) => {
                                const { id, coverImageUrl, title, courseCategory, courseLevel, description, averageReviewRating } = course;
                                return (
                                    <li key={id}>
                                        <img src={coverImageUrl} />
                                        <div className="info">
                                            <div className="inside-wrapper side">
                                                <h2>{title}</h2>
                                                <div className="inside-wrapper">
                                                    <i>{star}</i><h3>{averageReviewRating}</h3>
                                                </div>
                                            </div>

                                            <div className="inside-wrapper">
                                                <span>دسته بندی</span><p>{courseCategory}</p>
                                            </div>
                                            <div className="inside-wrapper">
                                                <span>سطح دوره</span><p>{courseLevel}</p>
                                            </div>
                                            <h3>{description}</h3>
                                        </div>
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


export async function coursesLoader() {
    return defer({
        courses: loadCourses(),
    })
}
const loadCourses = async() => {
    const response = await httpInterceptedService.get("/Course/list");
    console.log(response.data)
    return response.data
}