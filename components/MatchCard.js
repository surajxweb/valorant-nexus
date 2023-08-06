import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./MatchCard.module.css";

export default function MatchCard({ match }) {
  // Declaring states to store image URLs and tier data
  const [mapImageURL, setMapImageURL] = useState("");
  const [agentImageURL, setAgentImageURL] = useState("");
  const [tierArray, setTierArray] = useState([]);

  // Fetching image URLs and tier data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make parallel API requests using Promise.all for better performance
        const [mapResponse, agentResponse, tierResponse] = await Promise.all([
          fetch(`https://valorant-api.com/v1/maps/${match.meta.map.id}`),
          fetch(
            `https://valorant-api.com/v1/agents/${match.stats.character.id}`
          ),
          fetch(
            "https://valorant-api.com/v1/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04"
          ),
        ]);

        const mapData = await mapResponse.json();
        const agentData = await agentResponse.json();
        const tierData = await tierResponse.json();

        // Update the state with the fetched data
        setMapImageURL(mapData.data.listViewIcon);
        setAgentImageURL(agentData.data.displayIcon);
        setTierArray(tierData.data.tiers);
      } catch (e) {
        console.log("Error " + e);
      }
    };

    fetchData();
  }, [match.meta.map.id, match.stats.character.id]);

  // Calculating game results and scores
  const { team } = match.stats;
  const { red, blue } = match.teams;

  // Determine if the game is won or lost using ternary operators
  const isGameWon =
    (team === "Blue" && blue > red) || (team === "Red" && red > blue);

  // Determine our team's score and enemy team's score using ternary operators
  const ourScore = team === "Red" ? red : blue;
  const enemyScore = team === "Red" ? blue : red;

  // Calculate KDA, ACS, ADR, and HSP directly using destructured stats object
  const { kills, deaths, assists, score } = match.stats;
  const { made } = match.stats.damage;
  const { head, body, leg } = match.stats.shots;
  const acs = Math.round(score / (red + blue));
  const adr = Math.round(made / (red + blue));
  const hsp = Math.round((head / (head + body + leg)) * 100);

  return (
    <div
      className={styles.container}
      style={{
        background: isGameWon
          ? "linear-gradient(90deg, rgba(8,114,31,1) 0%, rgba(35,153,77,1) 35%, rgba(143,221,9,1) 100%)"
          : "linear-gradient(90deg, rgba(61,5,17,1) 0%, rgba(121,9,42,1) 35%, rgba(167,37,16,1) 100%)",
        color: isGameWon ? "#111" : "#ccc",
      }}
    >
      <div
        className={styles.mapBox}
        style={{
          backgroundImage: `url(${mapImageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.mapName}>{match.meta.map.name}</div>
      </div>

      <div className={styles.agent}>
        <Image src={agentImageURL} alt="agent image" height={70} width={70} />
        <div className={styles.agentName}>{match.stats.character.name}</div>
      </div>

      {tierArray[match.stats.tier] && (
        <div className={styles.rank}>
          <Image
            src={tierArray[match.stats.tier].largeIcon}
            alt="rank image"
            height={56}
            width={56}
          />
        </div>
      )}

      <div className={styles.score}>{`${ourScore} - ${enemyScore}`}</div>
      <div className={styles.stat}>
        <div className={styles.statTitle}>K/D/A</div>
        <div className={styles.statData}>{`${kills}/${deaths}/${assists}`}</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.statTitle}>ACS</div>
        <div className={styles.statData}>{acs}</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.statTitle}>ADR</div>
        <div className={styles.statData}>{adr}</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.statTitle}>HS%</div>
        <div className={styles.statData}>{hsp}</div>
      </div>
    </div>
  );
}
