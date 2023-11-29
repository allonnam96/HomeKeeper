import './ContractorSection.css'
import ContractorSectionIndex from './ContractorSectionIndexItem/ContractorSectionIndex/ContractorSectionIndex'
// import ContractorSectionIndexItem from './ContractorSectionIndexItem/ContractorSectionIndexItem'
import { fetchContractors } from "../../../store/contractors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import IntroSection from '../../IntroSection/IntroSection';

const ContractorSection = () => {
    const painting = []
    const remodeling = []
    const electrician = []
    const lawyers = []
    const plumbing = []
    const dispatch = useDispatch()
    const contractors = useSelector(state => Object.values(state.contractors || {}));
    
    useEffect(() => {
        dispatch(fetchContractors());
    }, [dispatch])

    contractors.forEach((contractor) => {
        if (contractor.category.name === 'Painter') {
            painting.push(contractor)
        } else if (contractor.category.name === 'Home Remodeler') {
            remodeling.push(contractor)
        } else if (contractor.category.name === 'Electrician') {
            electrician.push(contractor)
        } else if (contractor.category.name === 'Lawyer') {
            lawyers.push(contractor)
        } else if (contractor.category.name === 'Plumber') {
            plumbing.push(contractor)
        }
    })

    return (
        <>
        <div className="contractor-section-container">
        <IntroSection/>
            <div className="contractor-section-content">
                <h2>Featured Contractors</h2>
                <ContractorSectionIndex key={1} category={"Painting"} contractors={painting}/>
                <ContractorSectionIndex key={2} category={"Remodeling"} contractors={remodeling}/>
                <ContractorSectionIndex key={3} category={"Electrician"} contractors={electrician}/>
                <ContractorSectionIndex key={4} category={"Lawyer"} contractors={lawyers}/>
                <ContractorSectionIndex key={5} category={"Plumbing"} contractors={plumbing}/>
            </div>
        </div>
        </>
    )
}

export default ContractorSection