import ContractorSectionIndexItem from '../ContractorSectionIndexItem';
import './ContractorSectionIndex'

const ContractorSectionIndex = ({category, contractors}) => {
    
    return (
        <div className="contractor-section-index">
            <h3>{category}</h3>
            <ContractorSectionIndexItem key={1} id={1}/>
            <ContractorSectionIndexItem key={2} id={2}/>
            <ContractorSectionIndexItem key={3} id={3}/>
        </div>
    )
}

export default ContractorSectionIndex;