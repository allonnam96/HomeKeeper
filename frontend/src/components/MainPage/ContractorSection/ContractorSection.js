import './ContractorSection.css'
import ContractorSectionIndexItem from './ContractorSectionIndexItem/ContractorSectionIndexItem'

const ContractorSection = () => {
    
    return (
        <div className="contractor-section-container">
            <div className="contractor-section-content">
                <h2>Featured Contractors</h2>
                <div className="contractor-section-index">
                    <h3>Painting</h3>
                    <ContractorSectionIndexItem key={1} id={1}/>
                    <ContractorSectionIndexItem key={2} id={2}/>
                    <ContractorSectionIndexItem key={3} id={3}/>
                </div>
            </div>
        </div>
    )
}

export default ContractorSection