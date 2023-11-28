import { useState } from 'react'
import './Footer.css'

const Footer = () => {
    const [isThemeOpen, setIsThemeOpen] = useState(false)
    const [themeValue, setThemeValue] = useState("default")

    const toggleIsThemOpen = (e) => {
        e.preventDefault();
        setIsThemeOpen(!isThemeOpen)
    }

    const setCSSVariable = (varName, value) => {
        const root = document.documentElement;
        root.style.setProperty(varName, value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const root = document.documentElement;

        if(themeValue === "dark"){
            setCSSVariable('--primary-background', '#2C3333')
            setCSSVariable('--secondary-background', '#395B64')
            setCSSVariable('--tertiary-background', '#A5C9CA')

            setCSSVariable('--primary-button', '#000000')
            setCSSVariable('--secondary-button', '#000000')
            setCSSVariable('--primary-button-light', '#000000')
            setCSSVariable('--secondary-button-light', '#000000')

            setCSSVariable('--primary-text', '#FFFFFF')
            setCSSVariable('--secondary-text', '#FFFFFF')

            setCSSVariable('--primary-border', '#000000')
            setCSSVariable('--secondary-border', '#000000')
            setCSSVariable('--tertiary-border', '#000000')
            
            setCSSVariable('--primary-black', '#E7F6F2')
            setCSSVariable('--primary-gray', '#FFFFFF')
            setCSSVariable('--secondary-gray', '#000000')
            setCSSVariable('--tertiary-gray', '#000000')
            setCSSVariable('--primary-white', '#2C3333')
        }else if(themeValue === "light"){
            root.style.setProperty('--primary-background', '#FFFFFF')
        }else{
            setCSSVariable('--primary-background', '#f7dba7');
            setCSSVariable('--secondary-background', '#f1ab86');
            setCSSVariable('--tertiary-background', '#c57b57');

            setCSSVariable('--primary-button', '#041f1e');
            setCSSVariable('--secondary-button', '#1e2d2f');

            setCSSVariable('--primary-button-light', 'rgb(255 255 255)');
            setCSSVariable('--secondary-button-light', '#1e2d2f');

            setCSSVariable('--primary-text', 'rgb(25 25 25)');
            setCSSVariable('--secondary-text', 'rgb(73 73 73)');
            setCSSVariable('--primary-text-light', 'rgb(255 255 255)');

            setCSSVariable('--primary-border', 'rgb(25 25 25)');
            setCSSVariable('--secondary-border', 'rgb(73 73 73)');
            setCSSVariable('--tertiary-border', 'rgb(186 186 186)');

            setCSSVariable('--primary-black', 'rgb(25 25 25)');
            setCSSVariable('--primary-gray', 'rgb(73 73 73)');
            setCSSVariable('--secondary-gray', 'rgb(178, 178, 178)');
            setCSSVariable('--tertiary-gray', '#f3f7f7');
            setCSSVariable('--primary-white', 'rgb(255 255 255)');
        }
    }
    

    const themeSelector = () => {
        if(!isThemeOpen){
            return null
        }else{
            return (
                <div className="theme-selector">
                    <form onSubmit={handleSubmit}>
                        <select onChange={e => setThemeValue(e.target.value)}>
                            <option value="default">Default</option>
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                        <input type="submit" value="Submit" className="inverse-button" ></input>
                    </form>
                </div>
            )
        }
    }

    return (
        <div className="footer-main">
            <div className="footer-content">
                <button className="button select-theme-button" onClick={toggleIsThemOpen}>Theme Settings</button>
                {themeSelector()}
            </div>
        </div>
    )
}

export default Footer