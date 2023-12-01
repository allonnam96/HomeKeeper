import { useEffect } from 'react';
import './ContractorShow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractor } from '../../store/contractors';
import { useParams } from 'react-router-dom';
import Calendar from './Calendar/Calendar';
import { fetchReviews, getReviews, getReviewsAverage } from '../../store/reviews';
import StarRating from './Calendar/starRating';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

const ContractorShow = () => {
    const dispatch = useDispatch();
    const contractorId = useParams()['id'];
    const contractor = useSelector(state => state?.contractors ? state.contractors[contractorId] : '')
    const [reviewCount, reviewsAverage] = useSelector(state => state && contractor?._id ? getReviewsAverage(state, contractor._id) : [])
    const reviews = useSelector(state => getReviews(state, contractorId))
    useEffect(() => {
        dispatch(fetchContractor(contractorId))
        dispatch(fetchReviews())
    }, [dispatch])

    return (
        <div className="contractor-show-container">
            <div className="contractor-show-content">
                <div className="contractor-show-left">
                    <div className="contractor-show-info-card">
                        <div className="contractor-index-item-header-container">
                            <img src={contractor?.photoUrl} className="contractor-show-image" />
                            <div className="header-name-container wider">
                                <h3 className='user-show-information'>{contractor?.name}</h3>
                                <h3 id="category" className='user-show-information'>{contractor?.category ? contractor.category?.name : ''}</h3>
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
                                lat={37.128086930007335}
                                lng={-113.52320119021715}
                                name="test"
                                mapId={Math.random()}
                            />
                        </div>
                    </div>
                    <div className="contractor-show-reviews-card">
                        <h3>Reviews</h3>
                        { reviews && reviews.map(review => {
                            return (
                                <div className='contractor-review'>
                                    <div className='review-info'>
                                        <StarRating rating={review.reviewStar} />
                                    </div>
                                    <div className='review-info'>
                                        <p>{review?.reviewSummary}</p>
                                    </div>
                                    <div className='review-info'>
                                        <p> - {review?.name}</p>
                                    </div>
                                </div>
                            )
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