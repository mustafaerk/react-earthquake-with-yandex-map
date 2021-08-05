import React, { useEffect, useState } from 'react';

import YandexMap from "../Component/Map";

const EarthQuakeList = () => {
    const [listEarthQuake, setListEarthQuake] = useState([]);
    const [listData, setListData] = useState({ m: 3, lastDay: 7 })

    const fetchListFromAfad = async () => {
        let formData = new FormData();
        formData.append("m", listData.m);
        formData.append("utc", 0);
        formData.append("lastDay", listData.lastDay);
        const response = await fetch("https://deprem.afad.gov.tr/latestCatalogsList", { method: "POST", body: formData })
        setListEarthQuake(await response.json())
    }

    useEffect(() => {
        fetchListFromAfad();
    }, [])

    return (
        <div>
            <div style={{ padding: 10 }}>
                <label> Min Depth: </label>
                <input type="number" id="min" value={listData.m} placeholder="Min Depth" onChange={e => setListData({ ...listData, m: e.target.value })} />
                <label> From Last Day: </label>
                <input type="number" id="min" value={listData.lastDay} placeholder="From Last Day" onChange={e => setListData({ ...listData, lastDay: e.target.value })} />

                <button onClick={fetchListFromAfad} style={{ marginLeft: 10}} >Search </button>
            </div>
            <YandexMap listEarthQuake={listEarthQuake} />
        </div>
    );

}



export default EarthQuakeList;