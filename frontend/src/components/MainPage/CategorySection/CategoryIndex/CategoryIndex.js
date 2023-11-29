import "./CategoryIndex.css"
import { useDispatch, useSelector } from 'react-redux'
import CategoryIndexItem from "./CategoryIndexItem/CategoryIndexItem"
import { useEffect } from "react"
import { fetchCategories } from "../../../../store/category"

const CategoryIndex = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories ? Object.values(state.categories) : [])
    // const categories = ["Painting", "Remodeling", "Electrician", "Lawyer", "Plumbing"]

    useEffect(() => {
        dispatch(fetchCategories())
    },[dispatch])
    
    return (
        <div className="category-index">
            { categories?.map((category) => {
                return <CategoryIndexItem category={category} key={category.id}/>
            })}
        </div>
    )
}

export default CategoryIndex;