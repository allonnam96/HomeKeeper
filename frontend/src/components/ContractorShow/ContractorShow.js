import { useEffect } from 'react';
import './ContractorShow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractor } from '../../store/contractors';
import { useParams } from 'react-router-dom';
import Calendar from './Calendar/Calendar';
import { fetchReviews, getReviews, getReviewsAverage, removeReview } from '../../store/reviews';
import StarRating from './Calendar/starRating';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addReview } from '../../store/reviews';
import { useState } from 'react';
import InteractiveStarRating from './Calendar/InteractiveStarRating';
import { updateReview } from '../../store/reviews';

const ContractorShow = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const contractorId = useParams()['id'];
    const user = useSelector((state) => state.session.user);
    const contractor = useSelector(state => state?.contractors ? state.contractors[contractorId] : null)
    const [reviewCount, reviewsAverage] = useSelector(state => state && contractor?._id ? getReviewsAverage(state, contractor._id) : [])
    const reviews = useSelector(state => getReviews(state, contractorId))
    const [mapId, setMapId] = useState(Math.random());


    useEffect(() => {
        dispatch(fetchContractor(contractorId))
        dispatch(fetchReviews())
    }, [dispatch, contractorId])

    const handleCategoryClick = () => {
        history.push(`/categories/${contractor.category._id}`)
    }

    const [reviewFormData, setReviewFormData] = useState({
        reviewStar: 1,
        reviewSummary: '',
        name: user?.name,
        contractor: contractor?._id
    });

    const handleReviewFormChange = (e) => {
        setReviewFormData({
            ...reviewFormData,
            [e.target.name]:
                e.target.name === 'reviewStar'
                    ? parseInt(e.target.value, 10)
                    : e.target.value,
        });
    };

    const handleAddReview = () => {
        reviewFormData.contractor = contractor._id
        dispatch(addReview(reviewFormData));
        setReviewFormData({
            reviewStar: reviewFormData.reviewStar,
            reviewSummary: '',
            name: user?.name,
            contractor: contractor?._id
        });
    };

    return (
        <div className="contractor-show-container">
            <div className="contractor-show-content">
                <div className="contractor-show-left">
                    <div className="contractor-show-info-card">
                        <div className="contractor-index-item-header-container">
                            <img src={contractor?.photoUrl} className="contractor-show-image" />
                            <div className="header-name-container wider">
                                <h3 className='user-show-information'>{contractor?.name}</h3>
                                <h3 id="category" className='user-show-information category-name' onClick={handleCategoryClick}>{contractor?.category ? contractor.category?.name : ''}</h3>
                                <p id="bio" className='user-show-information'>{contractor?.bio}</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <p className='user-show-information'>{reviewsAverage} <span style={{ color: 'orange' }}>★</span> ({reviewCount})</p>
                            <p className='user-show-information'>{contractor?.email}</p>
                            <p className='user-show-information'>{contractor?.phoneNum}</p>
                            <p id="address" className='user-show-information'>{contractor?.address}</p>
                        </div>
                        <div className="google-maps">
                            <GoogleMaps
                                lat={parseFloat(contractor?.latitude)}
                                lng={parseFloat(contractor?.longitude)}
                                name="Contractor Show"
                                mapId={mapId}
                            />
                        </div>
                    </div>

                    {user ? 
                    <div className="add-review-form">
                        <h3>Add a Review</h3>
                        <div className='contractor-add-review'>
                        <div>
                            <InteractiveStarRating initialRating={reviewFormData.reviewStar} onChange={(newRating) => setReviewFormData({ ...reviewFormData, reviewStar: newRating })}/>
                        </div>
                        <div>
                            <textarea
                                rows="4" cols="50"
                                className='review-user-input'
                                value={reviewFormData.reviewSummary}
                                onChange={handleReviewFormChange}
                                placeholder={`What did you think of ${contractor?.name.split(' ')[0]}'s service?`}
                                name="reviewSummary"
                            />
                        </div>
                        <div className='review-actions'>
                            <button className='inverse-button' onClick={handleAddReview}>Add Review</button>
                        </div>
                    </div>
                    </div> : null
                    }

                    <div className="contractor-show-reviews-card">
                        <h3>Reviews</h3>
                        {reviews && reviews.reverse().map(review => {
                            return (
                                <div className='contractor-review' key={review.id}>
                                    <div className='review-info'>
                                        <StarRating rating={review.reviewStar} />
                                    </div>
                                    <div className='review-info'>
                                        <p>{review?.reviewSummary}</p>
                                    </div>
                                    <div className='review-info'>
                                        <p> - {review?.name}</p>
                                    </div>
                                    <div className='review-actions'>
                                        {review?.name === user?.name ?
                                            <>
                                                <button className='button' onClick={() => {dispatch(removeReview(review?._id))}}>
                                                    Delete Review
                                                </button>

                                                {/* <button className='button'>
                                                Update Review
                                                </button> */}
                                            </> :
                                            null
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="contractor-show-right slight-shadow">
                    <h3>Get Connected</h3>
                    <Calendar contractor={contractor} />
                </div>
            </div>
        </div>
    )
}

export default ContractorShow;