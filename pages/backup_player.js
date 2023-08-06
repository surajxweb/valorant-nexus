import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import Image from "next/image";

export default function Player() {
  // State declarations
  const [playerID, setPlayerID] = useState(null);
  const [playerRegion, setPlayerRegion] = useState(null);
  const [mmrDetails, setMMRDetails] = useState(null);
  const [matchDetails, setMatchDetails] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [playerCard, setPlayerCard] = useState("");

  // Input change handler
  const handleInput = (event) => {
    const inputValue = event.target.value;
    setUserInput(inputValue);
  };

  // Function to fetch player data
  const fetchPlayer = async () => {
    // Getting name tag right
    const nameTag = userInput.replace(/\s/g, "%20").replace("#", "/");

    // Clearing any previous data
    setMMRDetails(null);
    setMatchDetails([]);
    setPlayerID(null);
    setPlayerRegion(null);
    setPlayerCard("");

    try {
      // Getting region and player id
      const pidResponse = await fetch(
        `https://api.henrikdev.xyz/valorant/v1/account/${nameTag}`
      );
      const pidData = await pidResponse.json();
      setPlayerID(pidData.data.puuid);
      setPlayerRegion(pidData.data.region);
      setPlayerCard(pidData.data.card.large);
    } catch (e) {
      console.log("Failed " + e);
    }

    // Clear the input field after fetching data
    setUserInput("");
  };

  // Use useEffect to trigger the second API call whenever playerRegion, playerID, or playerCard changes
  useEffect(() => {
    const fetchMMRAndMatchDetails = async () => {
      if (playerRegion && playerID) {
        try {
          const mmrResponse = await fetch(
            `https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${playerRegion}/${playerID}`
          );

          const matchResponse = await fetch(
            `https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/${playerRegion}/${playerID}?mode=competitive&page=1&size=10`
          );

          const mmrData = await mmrResponse.json();
          const matchData = await matchResponse.json();

          // Update the mmrDetails and matchDetails states with the fetched data
          setMMRDetails(mmrData);
          setMatchDetails(matchData.data); // Assuming matchData is an object with a 'data' property containing the array
        } catch (error) {
          console.error("Error fetching MMR And Match details:", error);
        }
      }
    };

    fetchMMRAndMatchDetails();
    doMath();
  }, [playerRegion, playerID, playerCard]);

  return (
    <>
      <form>
        <input type="text" value={userInput} onChange={handleInput} />
        <button type="button" onClick={fetchPlayer}>
          <AiOutlineSend />
        </button>
      </form>
      <h2>Name:</h2>
      {mmrDetails && (
        <Image
          src={playerCard}
          alt="player card large"
          height={320}
          width={134}
        />
      )}
      {mmrDetails && <div>{mmrDetails.data.name}</div>}
      <h2>Rank:</h2>
      {mmrDetails && <div>{mmrDetails.data.currenttierpatched}</div>}
      <h2>Last 10 Maps:</h2>
      {matchDetails.length > 0 ? (
        matchDetails.map((match) => (
          <div key={match.meta.id}>{match.meta.map.name}</div>
        ))
      ) : (
        <div>No match details available.</div>
      )}
      {mmrDetails && sum}
    </>
  );
}

// 5SM eaglekai エース #1998



import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import Image from "next/image";

export default function Player() {
  // State declarations
  const [playerID, setPlayerID] = useState(null);
  const [playerRegion, setPlayerRegion] = useState(null);
  const [mmrDetails, setMMRDetails] = useState(null);
  const [matchDetails, setMatchDetails] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [playerCard, setPlayerCard] = useState("");
  const [kdRatio, setKDRatio] = useState(0);
  // const [hsPercentage, setHSPercentage] = useState(0);
  // const [winPercentage, setWinPercentage] = useState(0);
  // const [adr, setADR] = useState(0);

  // Input change handler
  const handleInput = (event) => {
    const inputValue = event.target.value;
    setUserInput(inputValue);
  };

  // Function to fetch player data
  const fetchPlayer = async () => {
    // Getting name tag right
    const nameTag = userInput.replace(/\s/g, "%20").replace("#", "/");

    // Clearing any previous data
    setMMRDetails(null);
    setMatchDetails([]);
    setPlayerID(null);
    setPlayerRegion(null);
    setPlayerCard("");

    try {
      // Getting region and player id
      const pidResponse = await fetch(
        `https://api.henrikdev.xyz/valorant/v1/account/${nameTag}`
      );
      const pidData = await pidResponse.json();
      setPlayerID(pidData.data.puuid);
      setPlayerRegion(pidData.data.region);
      setPlayerCard(pidData.data.card.large);
    } catch (e) {
      console.log("Failed " + e);
    }

    // Clear the input field after fetching data
    setUserInput("");
  };

  // Function to calculate K/D ratio, HS percentage, Win percentage, and ADR
  const calculateStats = () => {
    if (matchDetails.length > 0) {
      const kdr = matchDetails[0].stats.level;
      setKDRatio(kdr);
      // const totalKills = matchDetails.reduce((acc, match) => {
      //   return acc + match.kills;
      // }, 0);
      // const totalDeaths = matchDetails.reduce((acc, match) => {
      //   return acc + match.deaths;
      // }, 0);
      // const totalHeadshots = matchDetails.reduce((acc, match) => {
      //   return acc + match.headshots;
      // }, 0);
      // const totalRounds = matchDetails.reduce((acc, match) => {
      //   return acc + match.rounds_played;
      // }, 0);
      // const totalWins = matchDetails.reduce((acc, match) => {
      //   return acc + (match.won ? 1 : 0);
      // }, 0);
      // const totalDamage = matchDetails.reduce((acc, match) => {
      //   return acc + match.damage;
      // }, 0);

      // const kdr = totalKills / (totalDeaths || 1);
      // const hs = (totalHeadshots / totalKills) * 100 || 0;
      // const winPercent = (totalWins / matchDetails.length) * 100 || 0;
      // const avgDamage = totalDamage / totalRounds || 0;

      setKDRatio(kdr.toFixed(2));
      // setHSPercentage(hs.toFixed(2));
      // setWinPercentage(winPercent.toFixed(2));
      // setADR(avgDamage.toFixed(2));
    } else {
      setKDRatio(0);
      // setHSPercentage(0);
      // setWinPercentage(0);
      // setADR(0);
    }
  };

  // Use useEffect to trigger the second API call whenever playerRegion, playerID, or playerCard changes
  useEffect(() => {
    const fetchMMRAndMatchDetails = async () => {
      if (playerRegion && playerID) {
        try {
          const mmrResponse = await fetch(
            `https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${playerRegion}/${playerID}`
          );

          const matchResponse = await fetch(
            `https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/${playerRegion}/${playerID}?mode=competitive&page=1&size=10`
          );

          const mmrData = await mmrResponse.json();
          const matchData = await matchResponse.json();

          // Update the mmrDetails and matchDetails states with the fetched data
          setMMRDetails(mmrData);
          setMatchDetails(matchData.data); // Assuming matchData is an object with a 'data' property containing the array
        } catch (error) {
          console.error("Error fetching MMR And Match details:", error);
        }
      }
    };

    fetchMMRAndMatchDetails();
  }, [playerRegion, playerID, playerCard]);

  // Call the calculation function whenever matchDetails changes
  useEffect(() => {
    calculateStats();
  }, [matchDetails]);

  return (
    <>
      <form>
        <input type="text" value={userInput} onChange={handleInput} />
        <button type="button" onClick={fetchPlayer}>
          <AiOutlineSend />
        </button>
      </form>
      <h2>Name:</h2>
      {mmrDetails && (
        <Image
          src={playerCard}
          alt="player card large"
          height={320}
          width={134}
        />
      )}
      {mmrDetails && <div>{mmrDetails.data.name}</div>}
      <h2>Rank:</h2>
      {mmrDetails && <div>{mmrDetails.data.currenttierpatched}</div>}
      <h2>Last 10 Maps:</h2>
      {matchDetails.length > 0 ? (
        matchDetails.map((match) => (
          <div key={match.meta.id}>{match.meta.map.name}</div>
        ))
      ) : (
        <div>No match details available.</div>
      )}
      <div>K/D Ratio: {kdRatio}</div>
      {/* <div>Headshot Percentage: {hsPercentage}%</div>
      <div>Win Percentage: {winPercentage}%</div>
      <div>ADR (Average Damage per Round): {adr}</div> */}
    </>
  );
}

// 5SM eaglekai エース #1998
