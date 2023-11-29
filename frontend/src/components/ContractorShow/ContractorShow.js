import { useEffect } from 'react';
import './ContractorShow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractor } from '../../store/contractors';
import { useParams } from 'react-router-dom';
import Calendar from './Calendar/Calendar';

const ContractorShow = () => {
    const dispatch = useDispatch();
    const contractorId = useParams()['id'];
    const contractor = useSelector(state => state?.contractors ? state.contractors[contractorId] : '')

    useEffect(() => {
        dispatch(fetchContractor(contractorId))
    }, [dispatch])
    return (
        <div className="contractor-show-container">
            <div className="contractor-show-content">
                <div className="contractor-show-left slight-shadow">
                    <div className="contractor-show-info-card">
                        <div className="contractor-index-item-header-container">
                            <img src={contractor?.photoUrl} className="contractor-show-image" />
                            <div className="header-name-container wider">
                                <h3>{contractor?.name}</h3>
                                <h3 id="category">{contractor?.category ? contractor.category?.name : ''}</h3>
                                <p id="bio">{contractor?.bio}</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <p>{contractor?.email}</p>
                            <p>{contractor?.phoneNum}</p>
                            <p id="address">{contractor?.address}</p>
                        </div>
                    </div>
                    <div className="contractor-show-reviews-card">
                        <p>Reviews go here</p>
                    </div>
                </div>

                <div className="contractor-show-right slight-shadow">
                    <h3>Get Connected</h3>
                    <Calendar />
                </div>
            </div>
        </div>
    )
}

export default ContractorShow;