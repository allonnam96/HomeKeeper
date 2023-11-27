import "./CategoryIndex.css"
import { useSelector } from 'react-redux'
import CategoryIndexItem from "./CategoryIndexItem/CategoryIndexItem"

const CategoryIndex = () => {
    const categories = useSelector(state => state?.categories ? state.categories : [ "Plumming", "Painting", "Remodeling", "Electrician", "Lawyer", "Services"])
    return (
        <div className="category-index">
            { categories && categories.map(category => {
                return <CategoryIndexItem category={category} />
            })}
        </div>
    )
}

export default CategoryIndex;