export default function Maps({ maps }) {
  return (
    <div>
      <div>
        {maps.map((map) => (
          <div key={map.uuid}>{map.displayName}</div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const mapsResponse = await fetch("https://valorant-api.com/v1/maps");

  const mapsData = await mapsResponse.json();

  return {
    props: {
      maps: mapsData.data,
    },
  };
}
