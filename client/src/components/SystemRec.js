import React, {useEffect, useState} from 'react';
import SysRecItem from "./UI/SysRecItem";
import GraphService from "../api/GraphService";
import {useFetching} from "../hooks/useFetching";
import RecLoader from "./UI/RecLoader";

const SystemRec = ({name, data, setData, owner}) => {

    const [recommendations, setRecommendations] = useState([])

    const [fetchRecs, isRecsLoading, recsError] = useFetching(async (graphName) => {
        const response = await GraphService.getCache(graphName)

        if (response.data.length !== 0) {
            const cache = JSON.parse(response.data[0].data)
            if (cache.length !== 0) {
                setRecommendations(cache)
                return
            }
        }

        const recs = await GraphService.getRecommendations(graphName)
        setRecommendations(recs)
        const cached = await GraphService.setCache(graphName, recs)
        console.log("cached")
    })

    useEffect(() => {
        if (name === "")
            return
        fetchRecs(name)
    }, [name])

    return (
        <div>
            {recsError &&
                <h6>Произошла ошибка: {recsError}</h6>}
            <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-white text-center mt-4">
                Приложение рекомендует
            </h1>
            <div className="flow-root">
                <ul className="divide-y divide-gray-700">
                    {
                        recommendations.map(rec =>
                            <SysRecItem
                                rec={rec}
                                key={rec.title}
                                data={data}
                                setData={setData}
                                owner={owner}
                            />
                        )
                    }
                </ul>
            </div>
            {isRecsLoading &&
                <RecLoader/>
            }
        </div>
    );
};

export default SystemRec;