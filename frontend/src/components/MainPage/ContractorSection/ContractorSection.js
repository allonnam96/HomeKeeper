import './ContractorSection.css'
import ContractorSectionIndex from './ContractorSectionIndexItem/ContractorSectionIndex/ContractorSectionIndex'
import ContractorSectionIndexItem from './ContractorSectionIndexItem/ContractorSectionIndexItem'

const ContractorSection = () => {
    const painters = []
    const lawyers = []



    return (
        <div className="contractor-section-container">
            <div className="contractor-section-content">
                <h2>Featured Contractors</h2>

                <ContractorSectionIndex key={1} category={"Painting"} contractors={painters}/>
                <ContractorSectionIndex key={2} category={"Remodeling"}/>
                <ContractorSectionIndex key={3} category={"Electrician"}/>
                <ContractorSectionIndex key={4} category={"Lawyer"}/>
                <ContractorSectionIndex key={5} category={"Plumbing"}/>
            </div>
        </div>
    )
}

export default ContractorSection