import styles from "../styles/Agents.module.css";
import AgentCard from "../components/AgentCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Agents({ agents }) {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.agentList}>
        {agents.map((agent) => (
          <AgentCard
            image={agent.displayIcon}
            key={agent.uuid}
            name={agent.displayName}
            des={agent.description}
            role={agent.role.displayName}
            roleIcon={agent.role.displayIcon}
            bgimage={agent.background}
            color1={agent.backgroundGradientColors[0]}
            color2={agent.backgroundGradientColors[1]}
            color3={agent.backgroundGradientColors[2]}
            color4={agent.backgroundGradientColors[3]}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const agentsResponse = await fetch(
    "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
  );

  const agentsData = await agentsResponse.json();

  return {
    props: {
      agents: agentsData.data,
    },
  };
}
