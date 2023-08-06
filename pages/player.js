import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import PlayerCard from "../components/PlayerCard";
import MatchCard from "../components/MatchCard";

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
            `https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/${playerRegion}/${playerID}?mode=competitive&page=1&size=15`
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

  return (
    <>
      <form>
        <input type="text" value={userInput} onChange={handleInput} />
        <button type="button" onClick={fetchPlayer}>
          <AiOutlineSend />
        </button>
      </form>
      {mmrDetails && (
        <PlayerCard
          playerName={mmrDetails.data.name}
          playerTag={mmrDetails.data.tag}
          cardImage={playerCard}
          matchData={matchDetails}
          rank={mmrDetails.data.images.large}
          rankText={mmrDetails.data.currenttierpatched}
        />
      )}
      {matchDetails.length > 0 &&
        matchDetails.map((match) => (
          <MatchCard key={match.meta.id} match={match} />
        ))}
    </>
  );
}

// 5SM eaglekai エース #1998
