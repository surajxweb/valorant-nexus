import React, { useState, useEffect } from "react";

export default function Player() {
  const [playerID, setPlayerID] = useState(null);
  const [playerRegion, setPlayerRegion] = useState(null);
  const [mmrDetails, setMMRDetails] = useState(null);
  const [matchDetails, setMatchDetails] = useState([]);

  const fetchPlayer = async () => {
    // Getting region and player id
    const pidResponse = await fetch(
      "https://api.henrikdev.xyz/valorant/v1/account/%205SM%20ARYA%20/3303"
    );
    const pidData = await pidResponse.json();
    setPlayerID(pidData.data.puuid);
    setPlayerRegion(pidData.data.region);
  };

  // Use useEffect to trigger the second API call whenever playerRegion changes
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

          // Update the mmrDetails state with the fetched data
          setMMRDetails(mmrData);
          setMatchDetails(matchData.data); // Assuming matchData is an object with a 'data' property containing the array
        } catch (error) {
          console.error("Error fetching MMR And Match details:", error);
        }
      }
    };

    fetchMMRAndMatchDetails();
  }, [playerRegion, playerID]);

  return (
    <>
      <button onClick={fetchPlayer}>Get Player Info</button>
      {playerID && <div>{playerID}</div>}
      {playerRegion && <div>{playerRegion}</div>}
      <h2>Name:</h2>
      {mmrDetails && <div>{mmrDetails.data.name}</div>}
      <h2>Rank:</h2>
      {mmrDetails && <div>{mmrDetails.data.currenttierpatched}</div>}
      <h2>Last 10 Maps:</h2>
      {matchDetails.length > 0 ? (
        matchDetails.map((match) => (
          <div key={match.meta.id}>{match.meta.map.name}</div>
        ))
      ) : (
        <div>No match details available</div>
      )}
    </>
  );
}
