import './CategorySection.css'
import CategoryIndex from './CategoryIndex/CategoryIndex'

const CategorySection = () => {
    return (
        <div className="category-section-main">
            <div className="section-content">
                <h2>Top Categories</h2>
                <CategoryIndex />
            </div>
        </div>
    )
}

export default CategorySection;