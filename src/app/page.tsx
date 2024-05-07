import Image from "next/image";
import styles from "./page.module.css";
import { SolarPanel } from "@/components/SolarPanel";
import { PanelCalcType } from "@/utils";

export default function Home() {
  const options: PanelCalcType = {
    xAxis: 20,
    yAxis: 20,
    aSide: 1,
    bSide: 2,
    vertical: true,
  };
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
