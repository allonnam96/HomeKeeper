import ContractorSectionIndexItem from '../ContractorSectionIndexItem';
import './ContractorSectionIndex'

const ContractorSectionIndex = ({category, contractors}) => {
    
    return (
        <div className="contractor-section-index">
            <h3>{category}</h3>
            <ContractorSectionIndexItem key={1} contractor={contractors[1]}/>
            <ContractorSectionIndexItem key={2} contractor={contractors[2]}/>
            <ContractorSectionIndexItem key={3} contractor={contractors[3]}/>
        </div>
    )
}

export default ContractorSectionIndex;