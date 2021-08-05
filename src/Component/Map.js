import React from "react";
import { YMaps, Map, Circle, Clusterer, Button } from 'react-yandex-maps';
import PropTypes from 'prop-types';

const YandexMap = ({ listEarthQuake }) => {

    const handleCircleSize = (depth) => {
        let circleInfo = { circleSize: 100, circleColor: 100 }
        switch (true) {
            case depth < 4:
                circleInfo = {
                    circleSize: 4000,
                    circleColor: "#FFE3BF"
                }
                break;
            case depth < 7:
                circleInfo = {
                    circleSize: 8000,
                    circleColor: "#FFB321"
                }

                break;

            default:
                circleInfo = {
                    circleSize: 10000,
                    circleColor: "#DA0F10"
                }
                break;
        }
        return circleInfo
    }


    const renderCirclies = listEarthQuake?.map(elem => {
        const circleInfo = handleCircleSize(elem.depth)
        return <Circle
            key={elem.eventId}
            geometry={[[+elem.lat, +elem.lon], circleInfo.circleSize]}
            options={{
                fillColor: circleInfo.circleColor,
                strokeColor: '#000000',
                strokeOpacity: 0.8,
                strokeWidth: 2,
            }}

        />
    })

    return (
        <YMaps query={{
            lang: "en_US"
        }} >
            <Map height="95vh" width="100%" state={{ center: [39.92077, 32.85411], zoom: 9 }} >
                <Button
                    options={{ maxWidth: 250 }}
                    data={{ content: `Total EarthQuake: ${listEarthQuake.length + 1}` }}
                    defaultState={{ selected: true }}
                />
                <Clusterer
                    options={{ maxZoom: 8 }}
                >
                    {renderCirclies}
                </Clusterer>
            </Map>
        </YMaps>
    );
}

YandexMap.propTypes = {
    listEarthQuake: PropTypes.array,
};

YandexMap.defaultProps = {
    listEarthQuake: [],
};


export default YandexMap
