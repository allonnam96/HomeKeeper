import './ContractorSectionIndexItem.css'

const ContractorSectionIndexItem = ({contractor}) => {
    const backgroundImageStyle = {
        backgroundImage: `url(${contractor?.photoUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
    return (
        <div className="contractor-section-index-item-container">
            <div className="contractor-index-item-header-container">
            <div className="contractor-section-index-item-image-placeholder" style={backgroundImageStyle}></div>
                <div className="header-name-container">
                    <div className='contractor-name'>{contractor?.name}</div>
                    <div className="reviews-tag">4.5 ★ (100)</div>
                </div>
            </div>
            <div className="index-item-body-container">
                <p>{contractor?.phoneNum}</p>
                <p>{contractor?.email}</p>
                <p>{contractor?.address}, NY</p>
            </div>
        </div>
    )
}

export default ContractorSectionIndexItem;