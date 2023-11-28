import "./CategoryIndex.css"
import { useSelector } from 'react-redux'
import CategoryIndexItem from "./CategoryIndexItem/CategoryIndexItem"

const CategoryIndex = () => {
    const categories = useSelector(state => state?.categories ? state.categories : ["Painting", "Remodeling", "Electrician", "Lawyer", "Plumbing"])

    return (
        <div className="category-index">
            { categories && categories.map(category => {
                return <CategoryIndexItem category={category} key={category}/>
            })}
        </div>
    )
}

export default CategoryIndex;