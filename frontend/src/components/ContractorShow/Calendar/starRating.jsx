import React from 'react';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const remainingStars = 5 - fullStars;

    const renderStars = () => {
        const stars = [];
        
        for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="star" style={{ color: 'orange' }}>&#9733;</span>);
        }

        for (let i = 0; i < remainingStars; i++) {
        stars.push(<span key={`empty-${i}`} className="star" style={{ color: 'grey' }}>&#9733;</span>);
        }

        return stars;
    };

    return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;