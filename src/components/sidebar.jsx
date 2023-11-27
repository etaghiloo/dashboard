import { Link } from "react-router-dom";
import "./style.css";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Link to={`/`}>
                <h2>لیست دوره ها</h2>
            </Link>
            <Link to={`/course-categories`}>
                <h2>دسته بندی دوره ها</h2>
            </Link>
        </div>
    )
}