import "./CategoryIndex.css"
import { useSelector } from 'react-redux'
import CategoryIndexItem from "./CategoryIndexItem/CategoryIndexItem"

const CategoryIndex = () => {
    const categories = useSelector(state => state?.categories ? state.categories : [ "Plumbing", "Painting", "Remodeling", "Electrician", "Lawyer"])

    return (
        <div className="category-index">
            { categories && categories.map(category => {
                return <CategoryIndexItem category={category} key={category}/>
            })}
        </div>
    )
}

export default CategoryIndex;