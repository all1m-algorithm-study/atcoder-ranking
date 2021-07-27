import { useEffect, useState } from 'react';
import { ContentsPanel, HistoryList, PerformanceRanking, SteadyRanking } from '../components';
import { getParticipants } from '../shared/BackendCommunicator';
import './Home.scss';

function Home() {
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
                <HistoryList participants={partsInfo.participants}></HistoryList>
            </ContentsPanel>
        </div>
    );
}

export default Home;
