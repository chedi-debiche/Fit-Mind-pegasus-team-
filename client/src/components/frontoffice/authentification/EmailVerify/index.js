import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "./success.png";
import styles from "./styles.module.css";
import HeaderFront from "../../shared/HeaderFront";
import FooterFront from "../../shared/FooterFront";
// import { Fragment } from "react/cjs/react.production.min";
import { Fragment } from "react";


const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(false);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {

				const url = `http://localhost:5000/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{/* {validUrl ? ( }
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1 style>Great job ! Email verified successfully</h1>
					 <Link to="/signin">
						<button className={styles.green_btn}>Login</button>
					</Link> 
				</div>
			{/* ) : ( */}
			{/* )} */}
		</Fragment>
	);
};

export default EmailVerify;
