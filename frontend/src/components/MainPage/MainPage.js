import './MainPage.css'
import CategorySection from './CategorySection/CategorySection'
import MainSearchBar from './MainSearchBar/MainSearchBar';

const MainPage = () => {
    return (
        <>
            <MainSearchBar />
            <CategorySection />
        </>
    )
}

export default MainPage;