import './CategoryIndexItem.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import electrician_icon from '../../../../../img/electrician-icon.png';
import lawyer_icon from '../../../../../img/lawyer-icon.png';
import painter_icon from '../../../../../img/painter-icon.png';
import remodeler_icon from '../../../../../img/remodeler-icon.png';
import plumber_icon from '../../../../../img/plumber-icon.png';

const CategoryIndexItem = ({ category, setActiveCategory, activeCategory }) => {
    const history = useHistory();
    const [isSelected, setIsSelected] = useState(false);

    const icons = {
        Electrician: electrician_icon,
        Lawyer: lawyer_icon,
        Painter: painter_icon,
        Remodeler: remodeler_icon,
        Plumber: plumber_icon
    };

    const handleClick = () => {
        setIsSelected(true);
        history.push(`/categories/${category._id}`);
        setActiveCategory(category._id);
    };

    return (
        <div
            className={`category-index-item ${activeCategory == category._id ? 'selected' : ''}`}
            onClick={handleClick}>
            <div className="icon-container">
                <img src={icons[category?.name]} alt={`${category?.name} icon`} />
            </div>
            <h3 className="index-item-title">{category?.name}</h3>
        </div>
    );
}

export default CategoryIndexItem;
