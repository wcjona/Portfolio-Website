import NavbarComponent from "./components/Navbar";
import Introduction from "./components/sections/Introduction";
import Projects from "./components/sections/Projects";
import AboutMe from "./components/sections/AboutMe";
import Footer from "./components/Footer";
import React from "react";
import useLocalStorage from 'use-local-storage'


export const App = () => {  
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const theme = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
		return (
		<div className="app" data-theme={theme}>
			<NavbarComponent />
			<Introduction />
			<AboutMe />
			{/* <Projects /> */}
			<Footer />
		</div>
	);
};

export default App;