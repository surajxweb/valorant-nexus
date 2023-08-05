export default function Weapons({ weapons }) {
  return (
    <div>
      <div>
        {weapons.map((weapon) => (
          <div key={weapon.uuid}>{weapon.displayName}</div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const weaponsResponse = await fetch("https://valorant-api.com/v1/weapons");

  const weaponsData = await weaponsResponse.json();

  return {
    props: {
      weapons: weaponsData.data,
    },
  };
}
