import { useState } from 'react'
import './Footer.css'

const Footer = () => {
    const [isThemeOpen, setIsThemeOpen] = useState(false)

    const toggleIsThemOpen = (e) => {
        e.preventDefault();
        setIsThemeOpen(!isThemeOpen)
    }

    const darkTheme = () => {

    }

    const themeSelector = () => {
        if(!isThemeOpen){
            return null
        }else{
            return (
                <div className="theme-selector">
                    <form>
                        <select>
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                        <input type="submit" className="inverse-button"></input>
                    </form>
                </div>
            )
        }
    }

    return (
        <div className="footer-main">
            <div className="footer-content">
                <p onClick={toggleIsThemOpen}>Select Theme</p>
                {themeSelector()}
            </div>
        </div>
    )
}

export default Footer