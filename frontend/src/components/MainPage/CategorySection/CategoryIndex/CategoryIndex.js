import "./CategoryIndex.css"
import { useDispatch, useSelector } from 'react-redux'
import CategoryIndexItem from "./CategoryIndexItem/CategoryIndexItem"
import { useEffect, useState } from "react"
import { fetchCategories } from "../../../../store/category"

const CategoryIndex = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories ? Object.values(state.categories) : [])
    // const categories = ["Painting", "Remodeling", "Electrician", "Lawyer", "Plumbing"]

    const [activeCategory, setActiveCategory] = useState()

    useEffect(() => {
        dispatch(fetchCategories())
    },[dispatch])
    
    return (
        <div className="category-index">
            { categories?.map((category) => {
                return <CategoryIndexItem category={category} key={category.id} setActiveCategory={setActiveCategory} activeCategory={activeCategory}/>
            })}
        </div>
    )
}

export default CategoryIndex;