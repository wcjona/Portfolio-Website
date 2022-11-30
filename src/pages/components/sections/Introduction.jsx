import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export const Introduction = () => {
	return(
		<Container className="container" id="introduction">
			<Row className="intro-row">
				<Col sm={12} md={8} className="introduction">
				<h1>Hello, I'm <b>Jonathan Chong</b>.</h1>
				<p>An aspiring Software Engineer.</p>
				<a className="generic-btn" href="#about_me">View More.. </a>
				</Col>
				<Col sm={0} md={8} ></Col>
			</Row>
		</Container>
	);
};

export default Introduction;