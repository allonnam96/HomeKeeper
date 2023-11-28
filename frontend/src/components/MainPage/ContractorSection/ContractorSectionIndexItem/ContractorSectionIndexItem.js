import './ContractorSectionIndexItem.css'

const ContractorSectionIndexItem = ({contractor}) => {
    return (
        <div className="contractor-section-index-item-container">
            <div className="contractor-index-item-header-container">
                {/* <div className="contractor-section-index-item-image-placeholder"> */}
                    <img className="contractor-section-index-item-image-placeholder" src={contractor?.photoUrl}></img>
                {/* </div> */}
                <div className="header-name-container">
                    <h3>{contractor?.name}</h3>
                    <div className="reviews-tag">4.5 (100)</div>
                </div>
            </div>
            <div className="index-item-body-container">
                <p>{contractor?.phoneNum}</p>
                <p>{contractor?.email}</p>
                <p>11930 NW Kathleen Dr. Portland, OR</p>
            </div>
        </div>
    )
}

export default ContractorSectionIndexItem;