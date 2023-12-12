import jwtFetch from './jwt';

const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
})

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
})

const deleteReview = reviewId => ({
    type: DELETE_REVIEW,
    reviewId
})


export const fetchReviews = () => async dispatch => {
    const res = await jwtFetch ('/api/reviews')
    if (res.ok) {
        const reviews = await res.json()
        dispatch(receiveReviews(reviews))
    }
}

export const fetchReview = (reviewId) => async dispatch => {
    const res = await jwtFetch (`/api/reviews/${reviewId}`)
    if (res.ok) {
        const review = await res.json()
        dispatch(receiveReview(review))
    }
}

export const addReview = (review) => async dispatch => {
    const res = await jwtFetch('/api/reviews/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    })

    if (res.ok) {
        const review = await res.json()
        dispatch(receiveReview(review))
    }
}

export const updateReview = (updatedReview) => async dispatch => {
    const res = await jwtFetch(`/api/reviews/${updatedReview.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
    })

    if (res.ok) {
        const updatedReview = await res.json()
        dispatch(receiveReview(updatedReview))
    }
}

export const removeReview = (reviewId) => async dispatch => {
    const res = await jwtFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        dispatch(deleteReview(reviewId))
    }
}

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
            let reviews = {}

            action.reviews.forEach((review) => {
                reviews[review._id] = review
            })
            return reviews

        case RECEIVE_REVIEW:
            return {...newState, [action.review._id] : action.review}
        case DELETE_REVIEW:
            delete newState[action.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewsReducer