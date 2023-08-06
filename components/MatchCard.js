import { useEffect, useState } from "react";
import Image from "next/image";

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
      className="container"
      style={{ backgroundColor: isGameWon ? "green" : "red" }}
    >
      {match.meta.map.name}
      {match.stats.character.name}

      <Image src={mapImageURL} alt="map image" height={100} width={456} />
      <Image src={agentImageURL} alt="agent image" height={100} width={100} />

      {tierArray[match.stats.tier] && (
        <>
          <Image
            src={tierArray[match.stats.tier].largeIcon}
            alt="rank image"
            height={56}
            width={56}
          />
          {isGameWon ? "Won" : "Lost"}
          {`${ourScore}-${enemyScore}`}
          <div>{`${kills}/${deaths}/${assists}`}</div>
          <div>{acs}</div>
          <div>{adr}</div>
          <div>{hsp}</div>
        </>
      )}
    </div>
  );
}
