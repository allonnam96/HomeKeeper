import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchCategoryContractors } from "../../store/contractors"; // Import the correct action
import ContractorPreview from './ContractorPreview'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ContractorsCategoryIndex.css";

const ContractorsIndex = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const contractors = useSelector(state => Object.values(state.contractors || {}));

    useEffect(() => {
        dispatch(fetchCategoryContractors(categoryId));
    }, [dispatch, categoryId]);

    return (
        <div className="contractors-index-container">
        {contractors.map((contractor) => {
            return <ContractorPreview contractor={contractor} key={contractor.id}/>
        })}
        </div>
    )
}

export default ContractorsIndex;