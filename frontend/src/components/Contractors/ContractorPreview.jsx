import { useSelector } from 'react-redux';
import './ContractorPreview.css'
import { getReviewsAverage } from '../../store/reviews';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ContractorPreview = ({contractor}) => {
    const history = useHistory()
    const [reviewCount, reviewsAverage] = useSelector(state => state && contractor?._id ? getReviewsAverage(state, contractor._id) : [])

    const backgroundImageStyle = {
        backgroundImage: `url(${contractor?.photoUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
    return (
        <div className="contractor-section-index-item-container" onClick={() => {history.push(`/contractors/${contractor._id}`)}}>
            <div className="contractor-index-item-header-container">
            <div className="contractor-section-index-item-image-placeholder" style={backgroundImageStyle}></div>
                <div className="header-name-container">
                    <div className='contractor-name'>{contractor?.name}</div>
                    <div className="reviews-tag">{reviewsAverage} ★ ({reviewCount})</div>
                    
                </div>
            <div className="index-item-body-container">
                <p>{contractor?.phoneNum}</p>
                <p>{contractor?.email}</p>
                <p>{contractor?.address}, NY</p>
            </div>
            </div>
        </div>
    )
}

export default ContractorPreview