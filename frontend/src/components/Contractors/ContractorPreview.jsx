import { useSelector } from 'react-redux';
import './ContractorPreview.css'
import { getReviewsAverage } from '../../store/reviews';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ContractorPreview = ({ contractor }) => {
    const history = useHistory();
    const [reviewCount, reviewsAverage] = useSelector(state => state && contractor?._id ? getReviewsAverage(state, contractor._id) : [])

    const backgroundImageStyle = {
        backgroundImage: `url(${contractor?.photoUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className="contractor-preview-container" onClick={() => { history.push(`/contractors/${contractor._id}`) }}>
        <div className='profile-photo-preview'>
            <div className="contractor-preview-image-placeholder" style={backgroundImageStyle}></div>
        </div>

        <div className='profile-info-preview'>
            <div className="preview-body-container">
                <div className='preview-contractor-name'>{contractor?.name}</div>
                <div className="preview-reviews-tag">{reviewsAverage} <span style={{ color: 'orange' }}> ★ </span> ({reviewCount})</div>
                <p>{contractor?.phoneNum}</p>
                <p>{contractor?.email}</p>
                <p>{contractor?.address}, NY</p>
            </div>
        </div>
        </div>
    );
}

export default ContractorPreview;