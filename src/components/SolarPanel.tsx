"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { panelCount, PanelCalcType } from "@/utils";
import style from "./solarPanel.module.css";

interface IProps {
  options: PanelCalcType;
}

export const SolarPanel = () => {
  const [xAxis, setXAxis] = useState<number>();
  const [yAxis, setYAxis] = useState<number>();
  const [aSide, setASide] = useState<number>();
  const [bSide, setBSide] = useState<number>();
  const [xAxisInput, setXAxisInput] = useState<string>("");
  const [yAxisInput, setYAxisInput] = useState<string>("");
  const [aSideInput, setASideInput] = useState<string>("");
  const [bSideInput, setBSideInput] = useState<string>("");
  const [firstCanvas, setFirstCanvas] = useState<PanelCalcType>();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (xAxis && yAxis && aSide && bSide) {
      console.log("efect");
      const optionsV: PanelCalcType = {
        xAxis: xAxis,
        yAxis: yAxis,
        aSide: aSide,
        bSide: bSide,
        vertical: true,
      };
      const optionsH: PanelCalcType = {
        xAxis: xAxis,
        yAxis: yAxis,
        aSide: aSide,
        bSide: bSide,
        vertical: false,
      };

      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, xAxis * 100, yAxis * 100);
          ctx.strokeStyle = "#5a6ed5";
          ctx.font = "30px Arial";
          ctx.fillStyle = "black"; // Color del texto

          const panelV = panelCount(optionsV);
          const panelH = panelCount(optionsH);

          const panelTotal = panelH.length > panelV.length ? panelH : panelV;
          setFirstCanvas(panelH.length > panelV.length ? optionsH : optionsV);

          panelTotal.map((panel, index) => {
            if (panel.direcction == "vertical") {
              ctx.strokeRect(
                panel.a[0] * 100,
                panel.a[1] * 100,
                panel.width * 100,
                panel.height * 100
              );
            } else {
              ctx.strokeRect(
                panel.a[0] * 100,
                panel.a[1] * 100,
                panel.width * 100,
                panel.height * 100
              );
            }
            if (panel.direcction == "vertical") {
              const num = index + 1;
              ctx.fillText(
                num.toString(),
                panel.a[0] * 100 + (panel.width * 100) / 2 - 10,
                panel.a[1] * 100 + (panel.height * 100) / 2 + 15
              );
            } else {
              const num = index + 1;
              ctx.fillText(
                num.toString(),
                panel.a[0] * 100 + (panel.width * 100) / 2 - 10,
                panel.a[1] * 100 + (panel.height * 100) / 2 + 15
              );
            }
          });
        }
      }
    }
  }, [aSide, bSide, xAxis, yAxis]);

  return (
    <div className={style.container}>
      <div className={style.containerControl}>
        <div className={style.inputGroup}>
          <label>Techo</label>
          <div>
            <input
              type="number"
              min={0}
              max={50}
              value={xAxisInput}
              placeholder="Ancho"
              onChange={(e) => {
                if (e.target.value.length > 0 && e.target.value != "0") {
                  if (parseInt(e.target.value) >= 50) {
                    setXAxis(50);
                    setXAxisInput("50");
                  } else {
                    setXAxis(parseInt(e.target.value));
                    setXAxisInput(e.target.value);
                  }
                } else {
                  setXAxis(undefined);
                  setXAxisInput("");
                }
              }}
            />
            <input
              type="number"
              min={0}
              max={100}
              value={yAxisInput}
              placeholder="Alto"
              onChange={(e) => {
                if (e.target.value.length > 0 && e.target.value != "0") {
                  if (parseInt(e.target.value) >= 50) {
                    setYAxis(50);
                    setYAxisInput("50");
                  } else {
                    setYAxis(parseInt(e.target.value));
                    setYAxisInput(e.target.value);
                  }
                } else {
                  setYAxis(undefined);
                  setYAxisInput("");
                }
              }}
            />
          </div>
        </div>
        <div className={style.inputGroup}>
          <label>Panel Solar</label>
          <div>
            <input
              type="number"
              min={0}
              max={100}
              value={bSideInput}
              placeholder="Ancho"
              onChange={(e) => {
                if (e.target.value.length > 0 && e.target.value != "0") {
                  if (parseInt(e.target.value) >= 50) {
                    setBSide(50);
                    setBSideInput("50");
                  } else {
                    setBSide(parseInt(e.target.value));
                    setBSideInput(e.target.value);
                  }
                } else {
                  setBSide(undefined);
                  setBSideInput("");
                }
              }}
            />
            <input
              type="number"
              min={0}
              max={50}
              value={aSideInput}
              placeholder="Alto"
              onChange={(e) => {
                if (e.target.value.length > 0 && e.target.value != "0") {
                  if (parseInt(e.target.value) >= 50) {
                    setASide(50);
                    setASideInput("50");
                  } else {
                    setASide(parseInt(e.target.value));
                    setASideInput(e.target.value);
                  }
                } else {
                  setASide(undefined);
                  setASideInput("");
                }
              }}
            />
          </div>
        </div>
      </div>
      {(firstCanvas || (xAxis && yAxis && aSide && bSide)) && (
        <div className={style.containerCanvas}>
          <canvas
            className={style.canvas}
            ref={canvasRef}
            width={
              xAxis ? xAxis * 100 : firstCanvas ? firstCanvas.xAxis * 100 : 0
            }
            height={
              yAxis ? yAxis * 100 : firstCanvas ? firstCanvas.yAxis * 100 : 0
            }
          />
        </div>
      )}
    </div>
  );
};
