import React from "react";

import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";

const vietnamGeoUrl = "https://raw.githubusercontent.com/quynhnv97/Vietnammap/main/VietNamMap.json";

const paracelIslandGeoUrl =
    "https://raw.githubusercontent.com/quynhnv97/Vietnammap/main/HoangSaMap.json";

const spralyIslandGeoUrl =
    "https://raw.githubusercontent.com/quynhnv97/Vietnammap/main/TruongSaMap.json";

const vietnam = [vietnamGeoUrl, paracelIslandGeoUrl, spralyIslandGeoUrl];
const MapChart = ({ setTooltipContent }) => {
    return (
        <ComposableMap
            data-tip=""
            projection="geoMercator"
            projectionConfig={{
                scale: 2950,
                center: [107, 16]
            }}
            style={{
                width: "100%",
                height: "75vh"
            }}
        >
            {/* <ZoomableGroup> */}
                {vietnam.map((geoUrl) => (
                    <Geographies key={geoUrl} geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const { NAME_1 } = geo.properties;
                                        setTooltipContent(NAME_1);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#ffffff",
                                            stroke: "#212529",
                                            strokeWidth: 0.1,
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#e6dfd9",
                                            stroke: "#212529",
                                            strokeWidth: 0.1,
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                ))}
            {/* </ZoomableGroup> */}
        </ComposableMap>
    );
};

export default MapChart;
