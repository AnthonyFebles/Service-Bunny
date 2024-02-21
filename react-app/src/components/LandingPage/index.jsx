import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormPage from "../SignupFormPage";
import "./LandingPage.css";

function LandingPage() {
	const sessionUser = useSelector((state) => state.session.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { ref: sectionOne, inView: oneInView } = useInView();
	const { ref: sectionTwo, inView: twoInView } = useInView();
	const { ref: sectionThree, inView: threeInView } = useInView();
	const { ref: sectionFour, inView: fourInView } = useInView();

	const handleManagerLogin = () => {
		const demoCredentials = {
			email: "demo@aa.io",
			password: "password",
		};

		dispatch(login(demoCredentials.email, demoCredentials.password)).then(
			() => {
				navigate("/home");
			}
		);
	};
	const handleTechnicianLogin = () => {
		const demoCredentials = {
			email: "steve@aa.io",
			password: "password",
		};

		dispatch(login(demoCredentials.email, demoCredentials.password)).then(
			() => {
				navigate("/home");
			}
		);
	};
	const handleCustomerLogin = () => {
		const demoCredentials = {
			email: "marnie@aa.io",
			password: "password",
		};

		dispatch(login(demoCredentials.email, demoCredentials.password)).then(
			() => {
				navigate("/home");
			}
		);
	};

	useEffect(() => {
		const magnetic = document.querySelectorAll(".landing_button");

		function moveMouse(e) {
			let x = e.offsetX;
			let y = e.offsetY;
			let btnWidth = this.clientWidth; // 'this' refers to the button
			let btnHeight = this.clientHeight;
			let transX = x - btnWidth / 2;
			let transY = y - btnHeight / 2;
			this.style.transform = `translateX(${transX}px) translateY(${transY}px)`;
		}

		function removeMouse(e) {
			this.style.transform = ""; // 'this' refers to the button
		}

		magnetic.forEach((btn) => {
			btn.addEventListener("mousemove", moveMouse);
			btn.addEventListener("mouseout", removeMouse);
		});

		return () => {
			magnetic.forEach((btn) => {
				btn.removeEventListener("mousemove", moveMouse);
				btn.removeEventListener("mouseout", removeMouse);
			});
		};
	}, []);

	return (
		<div className="landing_page-container">
			<div className="home-logo">
				<h1 className="home-title">Welcome To Service Bunny</h1>
			</div>
			<section
				ref={sectionOne}
				className={`hidden-landing ${oneInView ? "show-landing" : ""}`}
			>
				<p className="home-paragraph">
					Welcome to Service Bunny, your go-to solution for getting tasks done
					efficiently and reliably. Say goodbye to the hassle of finding
					trustworthy professionals for your various needs. With Service Bunny,
					you can effortlessly post your job online for a wide audience to see,
					ensuring that you find the perfect match for your requirements.
				</p>
				<div className="technician-images">
					<div
						className={`technician-image hidden-landing ${
							oneInView ? "show-landing" : ""
						}`}
					>
						<img
							src="https://i.imgur.com/Wt8HmsN.jpeg"
							className="technician-image"
							height={350}
						/>
					</div>
					<div
						className={`technician-image hidden-landing ${
							oneInView ? "show-landing" : ""
						}`}
					>
						<img
							src="https://i.imgur.com/atVCnup.jpeg"
							className="technician-image"
							height={350}
						/>
					</div>
					<div
						className={`technician-image hidden-landing ${
							oneInView ? "show-landing" : ""
						}`}
					>
						<img
							src="https://i.imgur.com/D9FeD3D.jpeg"
							className="technician-image"
							height={350}
						/>
					</div>
					<div
						className={`technician-image hidden-landing ${
							oneInView ? "show-landing" : ""
						}`}
					>
						<img
							src="https://i.imgur.com/qLtrsOQ.jpeg"
							className="technician-image"
							height={350}
						/>
					</div>
				</div>
			</section>
			<section
				ref={sectionTwo}
				className={`hidden-landing ${twoInView ? "show-landing" : ""}`}
			>
				<h2 className="home-secondary"> Coverage For All Job Categories</h2>
				<p className="home-paragraph">
					Whether you're moving to a new home, need assistance with packing,
					require general labor support, or have specialized needs like
					construction, electrical work, or even nurse call service, Service
					Bunny has you covered. Our platform offers a diverse range of job
					categories, ensuring that whatever the task, there's someone skilled
					and ready to help.
				</p>
				<div className="category-images">
					<div
						className={`category-image hidden-landing ${
							twoInView ? "show-landing" : ""
						}`}
					>
						<img
							src="Images/Automotive.jpg"
							className="landing-image"
							width={300}
							height={250}
						/>
					</div>
					<div
						className={`category-image hidden-landing ${
							twoInView ? "show-landing" : ""
						}`}
					>
						<img
							src="Images/Electrical.jpg"
							className="landing-image"
							width={300}
							height={250}
						/>
					</div>
					<div
						className={`category-image hidden-landing ${
							twoInView ? "show-landing" : ""
						}`}
					>
						<img
							src="Images/NurseCall.jpg"
							className="landing-image"
							width={300}
							height={250}
						/>
					</div>
					<div
						className={`category-image hidden-landing ${
							twoInView ? "show-landing" : ""
						}`}
					>
						<img
							src="Images/General.jpg"
							className="landing-image"
							width={300}
							height={250}
						/>
					</div>
				</div>
			</section>

			<section
				ref={sectionFour}
				className={`hidden-landing ${fourInView ? "show-landing" : ""}`}
			>
				<h2 className="home-secondary">Get Started</h2>
				<p className="home-paragraph">
					Whether you're a homeowner looking for reliable assistance or a
					skilled professional seeking opportunities to showcase your expertise,
					Service Bunny is the perfect platform for you. Join our community
					today and experience the convenience and peace of mind that comes with
					finding the perfect solution for your tasks, all in one place. Service
					Bunny – where convenience meets reliability.
				</p>
				<ul className="landing-demo_buttons_container">
					<li
						className={`hidden-landing landing_button login-landing_button ${
							fourInView ? "show-landing" : ""
						} `}
					>
						<OpenModalButton
							className={"neutral-login landing-session"}
							buttonText="Log In"
							modalComponent={<LoginFormModal />}
						/>
					</li>
					<li
						className={`hidden-landing  landing_button signUp-landing_button ${
							fourInView ? "show-landing" : ""
						}`}
					>
						<OpenModalButton
							className={"neutral-signup landing-session"}
							buttonText="Sign Up"
							modalComponent={<SignupFormPage />}
						/>
					</li>
				</ul>
				<ul className="landing-demo_buttons_container">
					<li
						className={`hidden-landing landing_button manager-landing_button ${
							fourInView ? "show-landing" : ""
						} `}
						onClick={handleManagerLogin}
					>
						<span>Manager Demo</span>
					</li>
					<li
						className={`hidden-landing landing_button technician-landing_button ${
							fourInView ? "show-landing" : ""
						} `}
						onClick={handleTechnicianLogin}
					>
						<span>Technician Demo</span>
					</li>
					<li
						className={`hidden-landing landing_button customer-landing_button ${
							fourInView ? "show-landing" : ""
						} `}
						onClick={handleCustomerLogin}
					>
						<span>Customer Demo</span>
					</li>
				</ul>
			</section>
		</div>
	);
}

export default LandingPage;
