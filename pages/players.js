import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import PlayerCard from "../components/PlayerCard";
import MatchCard from "../components/MatchCard";
import styles from "../styles/Players.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Player() {
  //no of games (max value is 60)
  const numberOfGames = 30;
  // State declarations
  const [playerID, setPlayerID] = useState(null);
  const [playerRegion, setPlayerRegion] = useState(null);
  const [mmrDetails, setMMRDetails] = useState(null);
  const [matchDetails, setMatchDetails] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [playerCard, setPlayerCard] = useState("");
  const [isError, setIsError] = useState(false);

  // Input change handler
  const handleInput = (event) => {
    setIsError(false);
    const inputValue = event.target.value;
    setUserInput(inputValue);
  };

  // Function to fetch player data
  const fetchPlayer = async (e) => {
    e.preventDefault();
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
      setIsError(true);
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
            `https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/${playerRegion}/${playerID}?mode=competitive&page=1&size=${numberOfGames}`
          );

          const mmrData = await mmrResponse.json();
          const matchData = await matchResponse.json();

          // Update the mmrDetails and matchDetails states with the fetched data
          setMMRDetails(mmrData);
          setMatchDetails(matchData.data); // Assuming matchData is an object with a 'data' property containing the array
        } catch (error) {
          setIsError(true);
        }
      }
    };

    fetchMMRAndMatchDetails();
  }, [playerRegion, playerID, playerCard]);

  return (
    <>
      <Navbar />
      <div className={styles.form}>
        <form>
          <input
            placeholder="Enter Your Name and #GameTag"
            type="text"
            value={userInput}
            onChange={handleInput}
            required
          />

          <button type="sumbit" onClick={fetchPlayer}>
            <AiOutlineSend size="2em" color="#ccc" />
          </button>
        </form>
      </div>
      {isError && (
        <div className={styles.error}>
          Failed to Fetch Data! Make sure the entered name and #tag is correct
          and is saperated by #, and your profile is public.
        </div>
      )}
      <div className={styles.playerContainer}>
        {mmrDetails && (
          <PlayerCard
            playerName={mmrDetails.data.name}
            playerTag={mmrDetails.data.tag}
            cardImage={playerCard}
            matchData={matchDetails}
            rank={mmrDetails.data.images.large}
            rankText={mmrDetails.data.currenttierpatched}
            numberOfGames={numberOfGames}
          />
        )}
      </div>
      {mmrDetails && (
        <h3
          className={styles.heading}
        >{`A look at the last ${numberOfGames} games.`}</h3>
      )}
      <div className={styles.matchList}>
        {matchDetails.length > 0 &&
          matchDetails.map((match) => (
            <MatchCard key={match.meta.id} match={match} />
          ))}
      </div>
      <Footer />
    </>
  );
}

// 5SM eaglekai エース #1998
