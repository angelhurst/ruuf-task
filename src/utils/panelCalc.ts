export interface PanelCalcType {
  xAxis: number;
  yAxis: number;
  aSide: number;
  bSide: number;
  vertical: boolean;
}

interface CountReturnType {
  vertice1: { x: number; y: number };
  vertice2: { x: number; y: number };
  vertice3: { x: number; y: number };
  vertice4: { x: number; y: number };
}

interface PanelType {
  width: number;
  height: number;
  a: number[];
  b: number[];
  c: number[];
  d: number[];
  direcction: string;
}

/**
 * Cuenta el número de paneles en un área dada.
 *
 * @param {PanelCalcType} options Opciones de conteo de paneles.
 * @param {number} options.xAxis El tamaño del eje X del área.
 * @param {number} options.yAxis El tamaño del eje Y del área.
 * @param {number} options.aSide El tamaño del lado A de los paneles.
 * @param {number} options.bSide El tamaño del lado B de los paneles.
 * @param {boolean} options.vertical El tamaño del lado B de los paneles.
 * @returns {PanelType} El número total de paneles en el área.
 *
 */
export const panelCount = ({
  xAxis,
  yAxis,
  aSide,
  bSide,
  vertical = true,
}: PanelCalcType): PanelType[] => {
  const verticeVertical = [];
  const verticeHorizontal = [];
  const pointGrid = [];

  // calcular todos los puntos desde donde podria comenzar un panel

  for (let y = yAxis; y > 0; y--) {
    for (let x = 0; x < xAxis; x++) {
      pointGrid.push([x, yAxis - y]);
    }
  }

  // calcular los vertices panel horizontal
  for (let x = 0; x + aSide <= xAxis; x += aSide) {
    for (let y = yAxis; y - bSide >= 0; y -= bSide) {
      verticeHorizontal.push({
        a: [x, yAxis - y],
        b: [x + aSide, yAxis - y],
        c: [x + aSide, yAxis - y + bSide],
        d: [x, yAxis - y + bSide],
        direcction: "vertical",
      });
    }
  }

  // calcular los vertices panel horizontales
  for (let y = yAxis; y - aSide >= 0; y -= aSide) {
    for (let x = 0; x + bSide <= xAxis; x += bSide) {
      verticeVertical.push({
        a: [x, yAxis - y],
        b: [x + bSide, yAxis - y],
        c: [x + bSide, yAxis - y + aSide],
        d: [x, yAxis - y + aSide],
        direcction: "horizontal",
      });
    }
  }

  const verticeUnion = vertical
    ? verticeVertical.concat(verticeHorizontal)
    : verticeHorizontal.concat(verticeVertical);

  const panels = verticeUnion.map((panel) => {
    return {
      ...panel,
      width: panel.b[0] - panel.a[0],
      height: panel.d[1] - panel.a[1],
    };
  });

  const pointGridPanel = pointGrid
    .map((point) => {
      return {
        point: point,
        panels: panels.filter(
          (panel) => panel.a[0] == point[0] && panel.a[1] == point[1]
        ),
      };
    })
    .filter((count) => count.panels.length > 0);

  const panelsInstalled: PanelType[] = [];

  let total = 0;

  pointGridPanel.forEach((pointPanel) => {
    // recorrer todos los puntos disponibles en el grid

    pointPanel.panels.forEach((panel) => {
      // recorrer los paneles que existen para ese punto

      let panelPointNotInstalled = true;

      panelsInstalled.forEach((panelInstalled) => {
        // recorrer los paneles que ya se instalaron

        if (
          pointPanel.point[0] >= panelInstalled.a[0] &&
          pointPanel.point[0] < panelInstalled.b[0] &&
          pointPanel.point[1] >= panelInstalled.a[1] &&
          pointPanel.point[1] < panelInstalled.d[1]
        ) {
          panelPointNotInstalled = false;
        }
      });

      if (panelPointNotInstalled) {
        panelsInstalled.push(panel);
      }
    });
  });

  return panelsInstalled;
};
