import Link from "next/link";
import Image from "next/image";
import styles from "./AgentCard.module.css";

export default function AgentCard({
  image,
  name,
  des,
  role,
  roleIcon,
  bgimage,
  color1,
  color2,
  color3,
  color4,
}) {
  const gradient = `linear-gradient(45deg, #${color1}, #${color2}, #${color3}, #${color4})`;

  return (
    <>
      {/* <Link href={`/agents/${name}`}> */}
      <div
        className={styles.container}
        style={{
          background: gradient,
        }}
      >
        <div
          className={styles.agentImage}
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Image src={image} alt="agent image" height={100} width={100} />
        </div>
        <h2 className={styles.agentName}>{name}</h2>
        <div className={styles.des}>{des}</div>
        <div className={styles.role}>
          <div className={styles.roleName}>{role}</div>
          <div className={styles.roleIcon}>
            <Image src={roleIcon} alt="role icon" height={40} width={40} />
          </div>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}
