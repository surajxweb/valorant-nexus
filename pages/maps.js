import MapCard from "../components/MapCard";
import styles from "../styles/Maps.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Maps({ maps }) {
  return (
    <div>
      <Navbar />
      <div className={styles.mapList}>
        {maps.map((map) => (
          <MapCard
            key={map.uuid}
            name={map.displayName}
            image={map.splash}
            coordinates={map.coordinates}
          />
        ))}
      </div>
      <Footer />
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
