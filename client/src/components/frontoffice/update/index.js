import { useState,useEffect} from "react";
import axios from "axios";
import {useParams, Link } from "react-router-dom";
import styles from "./styles.module.css";




const UpdateUser = () => {
  
 
  const [data, setData] = useState({
	firstName:"",
    lastName:"",
    email:"",
    phone:"",
});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const { id } =useParams();






  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
	
	e = await Object.assign(e)
	
    e.preventDefault();
    try {
      
      const url = "http://localhost:5000/api/users/update";
      const { data: res } = await axios.put(`${url}/${id}`, data);
      console.log(res);
      setMsg(res);
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

 


	return (
        <div>
        {/* <HeaderSignedInClient/> */}
        
        
    <main>
<div className={styles.signup_container}>
            <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Update</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* <HeaderFront/> */}
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Here you can  <br/>update your <br/> account ! </h1>
					<Link to="/showdetails">
						<button type="button" className={styles.white_btn}>
							Back
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
                    {/* <form className={styles.form_container}> */}
						<h1>Update Account</h1>
						 {/* <div className='profile flex justify-center py-4'> */}

						 {/* <label htmlFor="profile">
                   
                  
                     <img src={file || avatar} className={styles.profile_img} alt="avatar"  /> 
					 </label>
                      <input onChange={onUpload} type="file" id='profile' name='profile' />  */}
              
				   


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
							name="firstName"
                            placeholder="irstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							name="lastName"
                            placeholder="lastName"
							onChange={handleChange}
							 value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							name="email"
                            placeholder="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>


                        <input
							type="password"
							name="password"
                            placeholder="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						
							<input
							type="text"
							name="phone"
                            placeholder="phone"
							onChange={handleChange}
						    value={data.phone}
							required
							className={styles.input}
						/>

						
						
						 {error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>} 
						<button type="submit" className={styles.green_btn}>
							Update
						</button>
					</form>
				</div>
			</div>
		</div>
    </main>
    </div>
		
	);
};

export default UpdateUser;