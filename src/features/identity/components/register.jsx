import { useForm } from "react-hook-form";
import logo from "../../../assets/images/logo.png";
import { Link, useActionData, useNavigate, useNavigation, useRouteError, useSubmit } from "react-router-dom";
import "./style.css";
import { httpService } from "../../../core/http-service";
import { useEffect } from "react";

export default function Register() {
    const { register, formState:{errors}, handleSubmit, watch } = useForm();

    // manually submitting the form, so that registerAction can get triggered
    const submitForm = useSubmit();
    const onSubmit = (data) => {
        // separating confirmPassword from the rest of the data
        const {confirmPassword, ...userData} = data;

        // submitting form with post method
        submitForm(userData, {method: "post"});
    }


    // disabling the button when submitting the form
    const navigation = useNavigation();
    const isSubmitting = navigation.state !== "idle"


    // accessing the registerAction return amount in the component
    const isSuccessful = useActionData();


    // redirecting the user to the login page if the registeration is successful
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccessful) {
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
    }, [isSuccessful])


    // displaying server errors
    const routeErrors = useRouteError();
    // console.log(routeErrors?.response)

    return (
        <>
            <div className="container">
                <div className="box register">
                    <div>
                        <img src={logo} style={{ height: "100px" }} />
                        <h1>پلتفرم آموزش آنلاین</h1>
                        <h3>جهت استفاده از ویژگی های پلتفرم آموزش آنلاین کلاسبن ثبت نام کنید</h3>
                        <h3>
                            قبلا ثبت نام کرده اید؟ <Link to="/login">وارد شوید</Link>
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>موبایل</label>
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
                            <label>رمز عبور</label>
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
                            <label>تکرار رمز عبور</label>
                            <input type="password" 
                                {...register("confirmPassword", {
                                    required: " تکرار رمز عبور الزامی است",
                                    validate: (value) => {
                                        if (watch("password") !== value) {
                                            return "عدم تطابق رمز عبور"
                                        }
                                    }
                                })}
                                className={`${errors.confirmPassword && "is-invalid"}`}
                            />
                            {
                                errors.confirmPassword ?
                                <p className="error">{errors.confirmPassword?.message}</p>
                                : ""
                            }
                        </div>
                        <div>
                            <button className="submit" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "...در حال ثبت نام" : "ثبت نام کنید"}
                            </button>
                        </div>

                        {isSuccessful ?
                            <p className="success">ثبت نام با موفقیت انجام شد. به صفحه ورود منتقل می شوید</p>
                            : ""
                        }

                        {routeErrors && (
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
    )
}


// gets enabled after form is submitted
// lets us separate posting data to the Api from the Register component
export async function registerAction({ request }) {
    // key: value
    const formData = await request.formData();

    // key: value => object
    const data = Object.fromEntries(formData);

    // posting data to the Api
    const response = await httpService.post("/Users" , data);
    // const response = await axios.post(`https://react-mini-projects-api.classbon.com/Users`, data)
    return response.status === 200;
}