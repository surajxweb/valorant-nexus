import Image from "next/image";

export default function PlayerCard({
  playerName,
  playerTag,
  rank,
  cardImage,
  rankText,
  matchData,
}) {
  //lets calculate everything? ok! kdr
  const totalKills = matchData.reduce(
    (total, match) => total + match.stats.kills,
    0
  );
  const totalDeaths = matchData.reduce(
    (total, match) => total + match.stats.deaths,
    0
  );
  const kdr = (totalKills / totalDeaths).toFixed(2);

  //adr

  const adr = Math.round(
    matchData.reduce((total, match) => total + match.stats.damage.made, 0) /
      (matchData.reduce((total, match) => total + match.teams.blue, 0) +
        matchData.reduce((total, match) => total + match.teams.red, 0))
  );

  //win%

  let winCounter = 0;

  for (let i = 0; i < matchData.length; i++) {
    if (
      (matchData[i].stats.team === "Red" &&
        matchData[i].teams.red > matchData[i].teams.blue) ||
      (matchData[i].stats.team === "Blue" &&
        matchData[i].teams.blue > matchData[i].teams.red)
    ) {
      winCounter++;
    }
  }

  const winp = Math.round((winCounter / matchData.length) * 100);

  //  headshot%

  const hsp = Math.round(
    (matchData.reduce((total, match) => total + match.stats.shots.head, 0) /
      (matchData.reduce((total, match) => total + match.stats.shots.body, 0) +
        matchData.reduce((total, match) => total + match.stats.shots.leg, 0))) *
      100
  );

  return (
    <div>
      <div>
        <Image
          src={cardImage}
          alt="player card large"
          height={320}
          width={134}
        />
      </div>
      <div>
        <h2>{playerName}</h2>
        <h3>{"#" + playerTag}</h3>
        <div>
          <Image src={rank} alt="rank" height={60} width={60} />
          <div>{rankText}</div>
        </div>

        <div>
          <div>
            <div>K/D RATIO</div>
            <div>{kdr}</div>
          </div>
          <div>
            <div>ADR</div>
            <div>{adr}</div>
          </div>
          <div>
            <div>WIN %</div>
            <div>{winp}</div>
          </div>
          <div>
            <div>HS %</div>
            <div>{hsp}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <h2>Name:</h2>
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
      <div>ADR (Average Damage per Round): {adr}</div> */
}
