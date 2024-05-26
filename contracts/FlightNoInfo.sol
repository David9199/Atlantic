// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FlightInfo {
    struct FlightNoInfo {
        string flightNo; // Flight number
        uint256 date; // Flight date
        uint256 plannedTakeoffTime; // Planned takeoff actual
        uint256 plannedlandingTime; // Planned landing actual
        uint256 actualTakeoffTime; // Actual takeoff actual
        uint256 actualLandingTime; // Actual landing actual
    }

    mapping(string => mapping(uint256 => FlightNoInfo)) public flightNoInfos;

    constructor() {
        flightNoInfos["SQ225-Singapore Airlines"][1716998400] = FlightNoInfo("SQ225-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ608-Singapore Airlines"][1716998400] = FlightNoInfo("SQ225-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ336-Singapore Airlines"][1716998400] = FlightNoInfo("SQ225-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ237-Singapore Airlines"][1716998400] = FlightNoInfo("SQ225-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["PR510Philippine"][1716998400] = FlightNoInfo("SQ225-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ328-Singapore Airlines"][1716998400] = FlightNoInfo("SQ225-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["IX681-Indian Express"][1716998400] = FlightNoInfo("SQ225-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["KL836-KLM"][1716998400] = FlightNoInfo("KL836-KLM",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["ZG54-ZIPAIR"][1716998400] = FlightNoInfo("ZG54-ZIPAIR",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ231-Singapore Airlines"][1716998400] = FlightNoInfo("SQ231-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["EK353-United Arab Emirates"][1716998400] = FlightNoInfo("EK353-United Arab Emirates",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["MU544-China Eastern Airlines"][1716998400] = FlightNoInfo("MU544-China Eastern Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["TR898-Cooler"][1716998400] = FlightNoInfo("TR898-Cooler",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["5J548-Cebu Pacific Airlines"][1716998400] = FlightNoInfo("5J548-Cebu Pacific Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["KE646-Korean Air"][1716998400] = FlightNoInfo("KE646-Korean Air",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ306-Singapore Airlines"][1716998400] = FlightNoInfo("SQ306-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ826-Singapore Airlines"][1716998400] = FlightNoInfo("SQ826-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ656-Singapore Airlines"][1716998400] = FlightNoInfo("SQ656-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
        flightNoInfos["SQ672-Singapore Airlines"][1716998400] = FlightNoInfo("SQ672-Singapore Airlines",1716998400,1714867200,1717038000,0,0);
    }

    function addFlightNoInfo(
        string memory flightNo,
        uint256 date,
        uint256 plannedTakeoffTime,
        uint256 plannedlandingTime,
        uint256 actualTakeoffTime,
        uint256 actualLandingTime
    ) public {
        flightNoInfos[flightNo][date] = FlightNoInfo(
            flightNo,
            date,
            plannedTakeoffTime,
            plannedlandingTime,
            actualTakeoffTime,
            actualLandingTime
        );
    }

    function addFlightNoInfo2(
        string[] memory flightNo,
        uint256[] memory date,
        uint256[] memory plannedTakeoffTime,
        uint256[] memory plannedlandingTime,
        uint256[] memory actualTakeoffTime,
        uint256[] memory actualLandingTime
    ) public {
        uint256 i;
        for (i = 0; i < flightNo.length; i++) {
            addFlightNoInfo(
                flightNo[i],
                date[i],
                plannedTakeoffTime[i],
                plannedlandingTime[i],
                actualTakeoffTime[i],
                actualLandingTime[i]
            );
        }
    }

    function updateFlightNoInfo(
        string memory flightNo,
        uint256 date,
        uint256 actualTakeoffTime,
        uint256 actualLandingTime
    ) public {
        flightNoInfos[flightNo][date].actualTakeoffTime = actualTakeoffTime;
        flightNoInfos[flightNo][date].actualLandingTime = actualLandingTime;
    }

    function updateFlightNoInfo2(
        string memory flightNo,
        uint256 date,
        uint256 plannedTakeoffTime,
        uint256 plannedlandingTime
    ) public {
        flightNoInfos[flightNo][date].plannedTakeoffTime = plannedTakeoffTime;
        flightNoInfos[flightNo][date].plannedlandingTime = plannedlandingTime;
    }

    function updateFlightNoInfo3(
        string[] memory flightNo,
        uint256[] memory date,
        uint256[] memory actualTakeoffTime,
        uint256[] memory actualLandingTime
    ) public {
        uint256 i;
        for (i = 0; i < flightNo.length; i++) {
            updateFlightNoInfo(
                flightNo[i],
                date[i],
                actualTakeoffTime[i],
                actualLandingTime[i]
            );
        }
    }

    function updateFlightNoInfo4(
        string[] memory flightNo,
        uint256[] memory date,
        uint256[] memory plannedTakeoffTime,
        uint256[] memory plannedlandingTime
    ) public {
        uint256 i;
        for (i = 0; i < flightNo.length; i++) {
            updateFlightNoInfo2(
                flightNo[i],
                date[i],
                plannedTakeoffTime[i],
                plannedlandingTime[i]
            );
        }
    }

    function getFlightNoInfo(string memory flightNo, uint256 date)
        public
        view
        returns (FlightNoInfo memory)
    {
        return flightNoInfos[flightNo][date];
    }

    function getFlightNoInfos()
        public
        view
        returns (FlightNoInfo[19] memory)
    {
       return [flightNoInfos["SQ225-Singapore Airlines"][1716998400],flightNoInfos["SQ608-Singapore Airlines"][1716998400], flightNoInfos["SQ336-Singapore Airlines"][1716998400],flightNoInfos["SQ237-Singapore Airlines"][1716998400],flightNoInfos["PR510Philippine"][1716998400],flightNoInfos["SQ328-Singapore Airlines"][1716998400],flightNoInfos["IX681-Indian Express"][1716998400],flightNoInfos["KL836-KLM"][1716998400],flightNoInfos["ZG54-ZIPAIR"][1716998400],flightNoInfos["SQ231-Singapore Airlines"][1716998400],flightNoInfos["EK353-United Arab Emirates"][1716998400],flightNoInfos["MU544-China Eastern Airlines"][1716998400],flightNoInfos["TR898-Cooler"][1716998400],flightNoInfos["5J548-Cebu Pacific Airlines"][1716998400],flightNoInfos["KE646-Korean Air"][1716998400],flightNoInfos["SQ306-Singapore Airlines"][1716998400],flightNoInfos["SQ826-Singapore Airlines"][1716998400],flightNoInfos["SQ656-Singapore Airlines"][1716998400],flightNoInfos["SQ672-Singapore Airlines"][1716998400]];
    }
}
