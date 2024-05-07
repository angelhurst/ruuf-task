import styles from "./page.module.css";
import { SolarPanel } from "@/components/SolarPanel";
import { PanelCalcType } from "@/utils";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.control}>
        Calculo de paneles &nbsp; <strong>solares</strong>{" "}
      </div>
      <SolarPanel />
      <a href={"https://angelhurst.github.io/"} className={styles.by}>
        by @angelhurst
      </a>
    </main>
  );
}
