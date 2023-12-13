import ContractorSectionIndexItem from '../ContractorSectionIndexItem';
import './ContractorSectionIndex'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ContractorSectionIndex = ({category, contractors}) => {
    const history = useHistory()
    
    const handleContractorClick = (index) => {
        debugger
        history.push(`/contractors/${contractors[index]._id}`)
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className="contractor-section-index">
            <h3>{category}</h3>
            <div onClick={() => {handleContractorClick(1)}}>
                <ContractorSectionIndexItem key={1} contractor={contractors[1]}/>
            </div>
            <div onClick={() => {handleContractorClick(2)}}>
                <ContractorSectionIndexItem key={2} contractor={contractors[2]}/>
            </div>
            <div onClick={() => {handleContractorClick(3)}}>
                <ContractorSectionIndexItem key={3} contractor={contractors[3]}/>
            </div>
        </div>
    )
}

export default ContractorSectionIndex;