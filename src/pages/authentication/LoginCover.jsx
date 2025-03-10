import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../app/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import logo from "../../assets/dailysaleslogo.png";
import fv_logo from "../../assets/finoracle.png";
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import { Password } from '@mui/icons-material';
import loginService from '../../services/Auth/loginService';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { setUserData,getUserData } from '../../utils/userData';
import * as Yup from "yup";
import AlertService from '../../utils/AlertService';
const LoginCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Cover'));
        const user = getUserData();
        console.log(user)
        if(user){
            navigate('/index');
        }
    },[]);
    const validationSchema = Yup.object().shape({
        emailOrUsername: Yup.string()
          .required("Email or Username is required")
          .test("emailOrUsername", "Invalid email or username", (value) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_]+$/.test(value)
          ),
        password: Yup.string().required("Password is required"),
      });
    
    const navigate = useNavigate();
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state) => state.themeConfig);
    const setLocale = (flag) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    
    const [loading, setLoading] = useState(false);

    const [flag, setFlag] = useState(themeConfig.locale);
    
    const handleLogin = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
          const response = await loginService.authenticate(values.emailOrUsername, values.password);
          console.log('response==>',response);
          if (response.data.isSuccess) {
            // Handle successful login (e.g., redirect, store token)
            //console.log("Login Successful", response.data.output);
            setUserData(response.data.output);
            navigate('/index');
          }
        } catch (error) {

          console.error("Error fetching data:", error);
          AlertService.error(error.response.data)
        }
        setLoading(false);
        setSubmitting(false);
      };
    
    const submitForm = () => {
        navigate('/');
    };

    return (
        <div>
            {/* <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div> */}
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                {/* <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" /> */}
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(255, 255, 255, 1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="/" className="w-48 block lg:w-72 ms-10">
                                <img src={logo} alt="Logo" className="w-full" />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                   <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                <img src={fv_logo} alt="Logo" className="mx-auto w-10" />
                            </Link>
                            {/* <div className="dropdown ms-auto w-max">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            // setFlag(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul> 
                                </Dropdown>
                            </div> */}
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <Formik
      initialValues={{ emailOrUsername: "", password: "", agreeTerms: false }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5 dark:text-white">
          <div>
            <label htmlFor="emailOrUsername">Email or Username</label>
            <div className="relative text-white-dark">
              <Field
                id="emailOrUsername"
                name="emailOrUsername"
                type="text"
                placeholder="Enter Email or Username"
                className="form-input ps-10 placeholder:text-white-dark"
              />
              <span className="absolute start-4 top-1/2 -translate-y-1/2">
                <IconMail fill={true} />
              </span>
            </div>
            <ErrorMessage name="emailOrUsername" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="relative text-white-dark">
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                className="form-input ps-10 placeholder:text-white-dark"
              />
              <span className="absolute start-4 top-1/2 -translate-y-1/2">
                <IconLockDots fill={true} />
              </span>
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label className="flex cursor-pointer items-center">
              <Field type="checkbox" name="agreeTerms" className="form-checkbox bg-white dark:bg-black" />
              <span className="text-white-dark">Agree Terms</span>
            </label>
            <ErrorMessage name="agreeTerms" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(201,48,35,255)]"
            disabled={isSubmitting}
          >
            Sign in
          </button>
        </Form>
      )}
    </Formik>

                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                           
                            <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/cover-register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}.FinOracle All Rights Reserved.</p>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default LoginCover;
