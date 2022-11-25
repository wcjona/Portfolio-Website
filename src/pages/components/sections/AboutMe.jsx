import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FaGithub, FaIdBadge, FaMailBulk, FaLinkedin } from "react-icons/fa";
export const AboutMe = () => {
	return(		
	<Container className="container" id="about_me">
			<h1>About Me</h1>
			<br></br>
				<p className="about-me-description">
					Hi! I'm Jonathan, a undergraduate student at the 
					University of Calgary studying Software Engineering 
					with a minor in Biomedical Engineering. I first got 
					involved in Computer Science in 5 years ago.
					Ever since then my interest and passion for the field 
					has skyrocketed.
				</p>
				<p>
					Aside from the multiple projects that I have done,  
					I have experience working for iGEM Calgary as a Software 
					and Modelling Developer, and a Embedded Test Software 
					Engineering Intern at Garmin. 
				</p>
				<p>
					In my spare time, I contribute to the clubs\events 
					that I am apart of.
				</p>
				<hr></hr>
				<Row className="contact">
					{/* <Col><a className="links" href="/resume/resume.pdf" download>Resume <FaIdBadge></FaIdBadge></a></Col> */}
					<Col><a className="links" href="https://www.linkedin.com/in/jonathanchongyyc">LinkedIn <FaLinkedin></FaLinkedin></a></Col>
					<Col><a className="links" href="mailto: jonathanchongyyc@gmail.com">Email <FaMailBulk></FaMailBulk></a></Col>
					<Col><a className="links" href="https://github.com/wcjona">Github <FaGithub></FaGithub></a></Col>
				</Row>


	</Container>
	);
};

export default AboutMe;