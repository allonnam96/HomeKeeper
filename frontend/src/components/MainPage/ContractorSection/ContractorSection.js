import './ContractorSection.css'
import ContractorSectionIndexItem from './ContractorSectionIndexItem/ContractorSectionIndexItem'

const ContractorSection = () => {
    return (
        <div className="contractor-section-container">
            <div className="contractor-section-content">
                <ContractorSectionIndexItem />
            </div>
        </div>
    )
}

export default ContractorSection