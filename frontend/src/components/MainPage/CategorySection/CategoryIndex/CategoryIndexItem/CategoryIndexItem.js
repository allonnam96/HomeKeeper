import './CategoryIndexItem.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CategoryIndexItem = ({ category }) => {
    const history = useHistory()
    return (
        <div className="category-index-item">
            <h3 className="index-item-title" onClick={() => {history.push(`/categories/${category._id}`)}}>{category?.name}</h3>
        </div>
    )
}

export default CategoryIndexItem;