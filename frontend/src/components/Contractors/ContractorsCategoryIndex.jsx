import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchCategoryContractors } from "../../store/contractors"; // Import the correct action
import ContractorPreview from './ContractorPreview'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ContractorsCategoryIndex.css";
import MultiPinMap from "../GoogleMaps/MultiPinMap";
import CategorySection from "../MainPage/CategorySection/CategorySection";

const ContractorsIndex = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const contractors = useSelector(state => Object.values(state.contractors || {}));
    const alphabet = "abcdefjhijklmnopqrstuvwxyz"
    let count = 0;
    const uniqueLatitudes = new Set();

    let pins = []
    contractors.forEach(contractor => {
        let  contractorId = contractor._id
        if(!uniqueLatitudes.has(contractor.latitude)){
            uniqueLatitudes.add(contractor.latitude)
        }else{
            return
        }

        let coordinates = { lat: contractor.latitude, lng: contractor.longitude, contractorId, name: contractor.name, count: alphabet[count++ % alphabet.length] }
        pins.push(coordinates)
    })

    useEffect(() => {
        dispatch(fetchCategoryContractors(categoryId));
    }, [dispatch, categoryId]);

    return (
        <>
        <CategorySection />
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
        </>
    );
}

export default ContractorsIndex;