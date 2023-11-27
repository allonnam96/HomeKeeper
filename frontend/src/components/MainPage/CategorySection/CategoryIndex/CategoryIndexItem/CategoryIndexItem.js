import './CategoryIndexItem.css'

const CategoryIndexItem = ({ category }) => {
    return (
        <div className="category-index-item hover-shadow">
            <h3 className="index-item-title">{category}</h3>
        </div>
    )
}

export default CategoryIndexItem;