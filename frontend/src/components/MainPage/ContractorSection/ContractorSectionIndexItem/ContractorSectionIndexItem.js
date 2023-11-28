import './ContractorSectionIndexItem.css'

const ContractorSectionIndexItem = ({id}) => {
    return (
        <div className="contractor-section-index-item-container">
            <div className="contractor-index-item-header-container">
                <div className="contractor-section-index-item-image-placeholder"></div>
                <div className="header-name-container">
                    <h3>Joe Burrow</h3>
                    <div className="reviews-tag">4.5 (100)</div>
                </div>
            </div>
            <div className="index-item-body-container">
                <p>(971) 777-1485</p>
                <p>joe@burrow.com</p>
                <p>11930 NW Kathleen Dr. Portland, OR</p>
            </div>
        </div>
    )
}

export default ContractorSectionIndexItem;