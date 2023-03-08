import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./styles.module.css";
import HeaderFront from "../../shared/HeaderFront";
import avatar from '../../profile.png';
import convertToBase64 from '../../convert';


const SITE_KEY = '6LfG7dckAAAAAKKcQVqZ5mS2jKb5DHWf4hVZwCx2';


const Signup = () => {
  const [data, setData] = useState({
	// profile:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone:"",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [recaptchaResponse, setRecaptchaResponse] = useState("");
  const [file, setFile] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
	
	e = await Object.assign(e, { profile : file || ''})
	
    e.preventDefault();
    if (!recaptchaResponse) {
      setError("Please complete the reCAPTCHA.");
      return;
    }
    try {
      const url = "http://localhost:5000/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleRecaptcha = (response) => {
    setRecaptchaResponse(response);
  };

  const captchaRef = useRef();

   /** formik doensn't support file upload so we need to create this handler */
 const onUpload = async e => {
 	const base64 = await convertToBase64(e.target.files[0]);
 	setFile(base64);
	// setData({ ...data, profile: base64 });
 }

	return (
        
    <main>
<div className={styles.signup_container}>
            <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>SIGN UP</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* <HeaderFront/> */}
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome back <br/>customer ! </h1>
					<Link to="/signin">
						<button type="button" className={styles.white_btn}>
							Sing in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						 {/* <div className='profile flex justify-center py-4'> */}

						 <label htmlFor="profile">
                   
                  
                     <img src={file || avatar} className={styles.profile_img} alt="avatar"  /> 
					 </label>
                      <input onChange={onUpload} type="file" id='profile' name='profile' /> 
              
				   


			 			{/* <input
							type="file"
							name="profile"
							id= "profile"
							onChange={onUpload} 
							onchange={handleChange} 
							value={data.profile}
							required
							 
							/> */}
						


						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						
							<input
							type="text"
							placeholder="Phone"
							name="phone"
							onChange={handleChange}
							value={data.phone}
							required
							className={styles.input}
						/>

							
							 <ReCAPTCHA
							 sitekey={SITE_KEY}
							 onChange={handleRecaptcha}
							 ref={captchaRef}
							 className={styles.input}
							 required
						   />
						
						
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
    </main>
		
	);
};

export default Signup;