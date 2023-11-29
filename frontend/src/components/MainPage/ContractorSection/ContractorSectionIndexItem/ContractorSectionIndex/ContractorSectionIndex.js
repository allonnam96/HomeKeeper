import ContractorSectionIndexItem from '../ContractorSectionIndexItem';
import './ContractorSectionIndex'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ContractorSectionIndex = ({category, contractors}) => {
    const history = useHistory()
    debugger
    return (
        <div className="contractor-section-index">
            <h3>{category}</h3>
            <div onClick={() => {history.push(`/contractors/${contractors[1]._id}`)}}>
                <ContractorSectionIndexItem key={1} contractor={contractors[1]}/>
            </div>
            <div onClick={() => {history.push(`/contractors/${contractors[2]._id}`)}}>
                <ContractorSectionIndexItem key={2} contractor={contractors[2]}/>
            </div>
            <div onClick={() => {history.push(`/contractors/${contractors[3]._id}`)}}>
                <ContractorSectionIndexItem key={3} contractor={contractors[3]}/>
            </div>
        </div>
    )
}

export default ContractorSectionIndex;