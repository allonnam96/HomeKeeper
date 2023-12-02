import './MainPage.css'
import CategorySection from './CategorySection/CategorySection'
import MainSearchBar from './MainSearchBar/MainSearchBar';
import ContractorSection from './ContractorSection/ContractorSection';
// import Footer from '../Footer/Footer';

const MainPage = () => {
    return (
        <div className="main-page-container">
            <CategorySection />
            <ContractorSection />
            {/* <Footer /> */}
        </div>
    )
}

export default MainPage;