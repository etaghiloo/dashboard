import { useForm } from "react-hook-form";
import logo from "../../../assets/images/logo.png";
import { Link, redirect, useNavigate, useNavigation, useRouteError, useSubmit } from "react-router-dom";
import "./style.css";
import { httpService } from "../../../core/http-service";

export default function Login() {
    const { register, formState:{errors}, handleSubmit } = useForm();

    const submitForm = useSubmit();
    const onSubmit = (data) => {
        submitForm(data, {method: "post"});
        // console.log(data)
    }

    const navigation = useNavigation();
    const isSubmitting = navigation.state !== "idle";

    const routeErrors = useRouteError();

    return (
        <>
            <div className="container">
                <div className="box login">
                    <div>
                        <img src={logo} style={{ height: "100px" }} />
                        <h1>پلتفرم آموزش آنلاین</h1>
                        <h3>جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید</h3>
                        <h3>
                            قبلا ثبت نام نکرده اید؟ <Link to="/register">ثبت نام کنید </Link>
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label >موبایل</label>
                            <input
                                {...register("mobile", {
                                    required: "وارد کردن موبایل الزامی است",
                                    minLength: 11,
                                    maxLength: 11,
                                })}
                                className={`${errors.mobile && "is-invalid"}`}
                            />
                            {
                                errors.mobile && errors.mobile.type === "required" ?
                                <p className="error">{errors.mobile?.message}</p>
                                : ""
                            }
                            {
                                errors.mobile && (errors.mobile.type === "minLength" || "maxLength") ?
                                <p className="error">موبایل باید 11 رقم باشد</p>
                                : ""
                            }
                        </div>
                        <div>
                            <label >رمز عبور</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "وارد کردن رمز عبور الزامی است",
                                })}
                                className={`${errors.password && "is-invalid"}`}
                            />
                            {
                                errors.password ?
                                <p className="error">{errors.password?.message}</p>
                                : ""
                            }
                        </div>
                        <div>
                            <button className="submit" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "در حال ورود" : "وارد شوید"}
                            </button>
                        </div>

                        {
                            routeErrors && (
                                <>
                                    {routeErrors.response?.data.map((error) => {
                                        return (
                                            <p key={error.description} className="error">{error.description}</p>
                                        )
                                    })}
                                </>
                            )
                        }
                    </form>
                </div>
            </div>
        </>
    );
};


export async function loginAction({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const response = await httpService.post("/Users/login", data);
    if (response.status === 200) {
        localStorage.setItem("token", response?.data.token);
        return redirect("/")
    }
}