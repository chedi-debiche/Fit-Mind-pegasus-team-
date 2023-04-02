import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from 'react-router-dom';

import { Form,Button } from 'react-bootstrap';

import styles from "./styles.module.css";





const Profile = () => {
  const [data, setData]= useState([{
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
	 userType:""
   
  }]);
  const {id} = useParams();
  const token = localStorage.getItem('token');
  const url = "http://localhost:5000/api/users/getById";
  //const { data: res } = await axios.get(`${url}/${id}`);
  const getData = async()=>{
    try{
    const result = await axios.get(`${url}/${id}`
    ,{
      headers:{
      Authorization:`Bearer ${token}`
      }
    }
    );
    //console.log(result)
    setData(result.data);
  }catch(error){
    console.error(error);
  }
};
  useEffect(() => {
    getData();

    },[]);

  
console.log("AaAaAa")
console.log(data)

    return (
        <main>
        <div className={styles.signup_container}>
                    <div className="slider-area2">
                <div className="slider-height2 d-flex align-items-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="hero-cap hero-cap2 pt-70">
                          <h2>Your Profile</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    {/* <HeaderFront/> */}
                    <div className={styles.signup_form_container}>
                        <div className={styles.left}>
                            <h1>Profile <br/>details ! </h1>
                            <h1></h1>
                            < Link to={`/update/${data._id}`} >
                           <button type="button" className={styles.white_btn}>
                           Update
                          </button>
                          </Link>
                            <h1></h1><h1></h1><h1></h1>
                            <Link to="/signedin">
                            
                            <button type="button" className={styles.white_btn}>
                                back
                            </button>
                            </Link>
                           
                        
                        </div>
                        <div className={styles.right}>
                         


                         {data.userType === "User" ? (
                         <div>
                          <br></br><br></br>
                         
                         <h1>firstName</h1>
                         <strong>{data.firstName}</strong>
                         <br></br><br></br>
                         <h1>lastName</h1>
                         <strong>{data.lastName}</strong>
                         <br></br><br></br>
                         <h1>Email</h1>
                         <strong>{data.email}</strong>
                         <br></br><br></br>
                         <h1>Phone</h1>
                         <strong>{data.phone}</strong>
                         <br></br><br></br>
                         </div>
                         ) : data.userType === "Coach" ? (
                         <div>
                         <h1>firstName</h1>
                         <strong>{data.firstName}</strong>
                         <br></br><br></br>
                         <h1>lastName</h1>
                         <strong>{data.lastName}</strong>
                         <br></br><br></br>
                         <h1>Email</h1>
                         <strong>{data.email}</strong>
                         <br></br><br></br>
                         <h1>Phone</h1>
                         <strong>{data.phone}</strong>
                         <br></br><br></br>
                         <h1>Experience</h1>
                         <strong>{data.experience}</strong>
                         <h1>Certificate Title</h1>
                         <strong>{data.certificate.title}</strong>
                         <h1>Certificate Date</h1>
                         <strong>{data.certificate.date}</strong>
                         <h1>Gender</h1>
                         <strong>{data.gender}</strong>


                         </div>):(
                          <div>
                          <h1>firstName</h1>
                         <strong>{data.firstName}</strong>
                         <br></br><br></br>
                         <h1>lastName</h1>
                         <strong>{data.lastName}</strong>
                         <br></br><br></br>
                         <h1>Email</h1>
                         <strong>{data.email}</strong>
                         <br></br><br></br>
                         <h1>Phone</h1>
                         <strong>{data.phone}</strong>
                         <br></br><br></br>
                         <h1>Location</h1>
                         <strong>{data.location}</strong>
                          </div>
                         )}
                         
      
      

   

                         
                         
                          
                          
                          
                         
                         
                         
                        </div>
                    </div>
                </div>
            </main>
            
  
        
    );
    
};

export default Profile;
