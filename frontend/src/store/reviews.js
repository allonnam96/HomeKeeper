import jwtFetch from './jwt';

const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

export const fetchReviews = () => async dispatch => {
    const res = await jwtFetch ('/api/reviews');
    if (res.ok) {
        const reviews = await res.json();
        dispatch(receiveReviews(reviews));
    }
};

export const fetchReview = (reviewId) => async dispatch => {
    const res = await jwtFetch (`/api/reviews/${reviewId}`);
    if (res.ok) {
        const review = await res.json();
        dispatch(receiveReview(review));
    }
};

export const getReviews = (state, contractorId) => {
    let reviews = []
    if(!state.reviews){
        return []
    }else{
        Object.values(state.reviews).forEach(review => {
            if(review.contractor._id === contractorId){
                reviews.push(review)
            }
        })
        return reviews
    }
}

export const getReviewsAverage = (state, contractorId) => {
    const reviews = getReviews(state, contractorId)

    let totalReviewScore = reviews.reduce((total, review) =>{
        return total + review.reviewStar
    },0)
    const reviewCount = reviews.length
    return reviewCount > 0 ? [reviewCount, (totalReviewScore / reviewCount).toFixed(1)] : [0, "0.0"]
}

const reviewsReducer = (state = { }, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_REVIEWS:
            return {...action.reviews};
        case RECEIVE_REVIEW:
            return {...newState, [action.review._id] : action.review}
        default:
            return state;
    }
}

export default reviewsReducer