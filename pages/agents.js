export default function Agents({ agents }) {
  return (
    <div>
      {agents.map((agent) => (
        <div key={agent.uuid}>{agent.displayName}</div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const agentsResponse = await fetch(
    "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
  );

  const agentsData = await agentsResponse.json();
  console.log(agentsData.data);

  return {
    props: {
      agents: agentsData.data,
    },
  };
}
