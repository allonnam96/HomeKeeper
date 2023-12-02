import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchCategoryContractors } from "../../store/contractors"; // Import the correct action
import ContractorPreview from './ContractorPreview'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ContractorsCategoryIndex.css";
import MultiPinMap from "../GoogleMaps/MultiPinMap";

const ContractorsIndex = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const contractors = useSelector(state => Object.values(state.contractors || {}));

    let pins = []
    contractors.forEach(contractor => {
        let coordinates = { lat: contractor.latitude, lng: contractor.longitude}
        pins.push(coordinates)
    })
    console.log(pins)

    useEffect(() => {
        dispatch(fetchCategoryContractors(categoryId));
    }, [dispatch, categoryId]);

    return (
        <div className="contractors-index-container">
            <div className="contractors-list">
                {contractors.map((contractor) => (
                    <ContractorPreview contractor={contractor} key={contractor.id} />
                ))}
            </div>
            <div className="google-maps-placeholder">
                <MultiPinMap 
                    pins={pins}
                    name="Contractor Index"
                    mapId={Math.random()}
                />
            </div>
        </div>
    );
}

export default ContractorsIndex;