import { useEffect, useState, Fragment } from 'react';
import { ContentsPanel, ControlPanel, HistoryList, PerformanceRanking, SteadyRanking } from '../components';
import { getParticipants } from '../shared/BackendCommunicator';
import { withCookies } from 'react-cookie';
import './Home.scss';
import getToken from '../shared/GetToken';

function Home(props) {
    const { cookies } = props;
    const [partsInfo, setPartsInfo] = useState({participants: []});

    useEffect(() => {
        getParticipants()
            .then((parts) => {
                setPartsInfo(parts);
            })
            .catch((err) => {
                alert(`참가자 정보를 가져올 수 없었습니다. (${err})`);
            });
    }, []);

    return (
        <div className="home-root">
            <ContentsPanel title="부문별 순위">
                <div className="home-rankings-layout">
                    <SteadyRanking participants={partsInfo.participants}></SteadyRanking>
                    <PerformanceRanking participants={partsInfo.participants}></PerformanceRanking>
                </div>
            </ContentsPanel>
            
            <ContentsPanel title="전체 대회 참여 기록">
                <div className="home-list-layout">
                    <HistoryList participants={partsInfo.participants}></HistoryList>
                </div>
            </ContentsPanel>

            {getToken(cookies) ? (
                <ContentsPanel title="관리자용 제어판">
                    <div className="home-ctr-layout">
                        <ControlPanel></ControlPanel>
                    </div>
                </ContentsPanel>
            ) : (
                <Fragment/>
            )}
        </div>
    );
}

export default withCookies(Home);
