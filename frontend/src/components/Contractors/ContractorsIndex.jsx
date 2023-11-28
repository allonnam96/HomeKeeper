import { fetchContractors } from "../../store/contractors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import ContractorPreview from './ContractorPreview'

const ContractorsIndex = () => {
    const dispatch = useDispatch();
    const contractors = useSelector(state => Object.values(state.contractors || {}));

    useEffect(() => {
        dispatch(fetchContractors());
    }, [dispatch])

    return (
        <>
        {contractors.map((contractor) => {
            return <ContractorPreview contractor={contractor} key={contractor.id}/>
        })}
        </>
    )
}

export default ContractorsIndex