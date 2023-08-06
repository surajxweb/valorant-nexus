import Image from "next/image";
import styles from "./PlayerCard.module.css";

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

  //last Online

  const lastDate = matchData[0].meta.started_at;
  const dateObject = new Date(matchData[0].meta.started_at);
  const lastDateOnline = new Date(
    matchData[0].meta.started_at
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          src={cardImage}
          alt="player card large"
          height={370}
          width={156}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{playerName}</h2>
        <h3 className={styles.tag}>{"#" + playerTag}</h3>
        <div className={styles.rank}>
          <Image src={rank} alt="rank" height={60} width={60} />
          <div className={styles.rankText}>{rankText}</div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statTitle}>K/D RATIO</div>
            <div className={styles.statData}>{kdr}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statTitle}>ADR</div>
            <div className={styles.statData}>{adr}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statTitle}>WIN %</div>
            <div className={styles.statData}>{winp}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statTitle}>HS %</div>
            <div className={styles.statData}>{hsp}</div>
          </div>
        </div>
        <div>Data based on last 15 Competitive Games.</div>
      </div>
    </div>
  );
}
