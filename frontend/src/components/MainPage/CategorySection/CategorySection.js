import './CategorySection.css'
import CategoryIndex from './CategoryIndex/CategoryIndex'

const CategorySection = () => {
    return (
        <div className="category-section-main">
            <div className="section-content">
                <CategoryIndex />
            </div>
        </div>
    )
}

export default CategorySection;