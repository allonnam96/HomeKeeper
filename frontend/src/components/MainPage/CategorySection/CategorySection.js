import './CategorySection.css'
import CategoryIndex from './CategoryIndex/CategoryIndex'
import SearchBar from '../../NavBar/SearchBar';

const CategorySection = () => {
    return (
        <div className="category-section-main">
            <div className="section-content">
                <SearchBar />
                <CategoryIndex />
            </div>
        </div>
    )
}

export default CategorySection;