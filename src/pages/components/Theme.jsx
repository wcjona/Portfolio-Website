import { MDBSwitch } from 'mdb-react-ui-kit';

export const Theme = () => {
    var storedTheme = localStorage.getItem("theme");
    
    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: Dark)").matches;
    
    const defaultDark = (storedTheme === "Dark" || (storedTheme === null && prefersDark));
    
    if (defaultDark) {
        localStorage.setItem("theme", "Dark");
        document.documentElement.setAttribute("data-theme", "Dark");
    }

    const toggleTheme = () => {
        storedTheme = localStorage.getItem("theme")

        if (storedTheme === "Dark") {
            localStorage.setItem("theme", "Light");
            document.documentElement.setAttribute("data-theme", "Light");
        } else {
            localStorage.setItem("theme", "Dark");
            document.documentElement.setAttribute("data-theme", "Dark");
        }
    };
    return(
        <div className="toggleTheme navbar-brand">
            <text className="toggleName">Dark Mode</text>
            <MDBSwitch id='flexSwitchCheckDefault' onClick={toggleTheme} defaultChecked={defaultDark}/>
        </div>
    );
};

export default Theme;