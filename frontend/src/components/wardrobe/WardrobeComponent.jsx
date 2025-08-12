import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { ColorPicker } from "primereact/colorpicker";
import { Badge } from "primereact/badge";

import BackPanel from "./partials/BackPanel";
import Base from "./partials/Base";
import LeftSidePanel from "./partials/LeftSidePanel";
import RightSidePanel from "./partials/RightSidePanel";
import TopPanel from "./partials/TopPanel";
import Glass from "./partials/Glass";

import Ground from "../Ground";
import Origin from "../Origin";

import { useFrame } from "@react-three/fiber";

function WardrobeComponent() {
  const [visible, setVisible] = useState(false);
  const [widthValue, setWidthValue] = useState();
  const [heightValue, setHeightValue] = useState();
  const [depthValue, setDepthValue] = useState();
  const [colorRGB, setColorRGB] = useState(null);

  const [selectedPanel, setSelectedPanel] = useState(null);

  //Manages the visual dimensions of my elements
  const [topPanelScale, setTopPanelScale] = useState();
  const [leftPanelScale, setLeftPanelScale] = useState();
  const [rightPanelScale, setRightPanelScale] = useState();
  const [backPanelScale, setBackPanelScale] = useState();
  const [glassScale, setGlassScale] = useState();
  const [baseScale, setBaseScale] = useState();
  //
  useEffect(() => {
    fetch("http://backend:4000/panel-types")
      .then((res) => res.json())
      .then((data) => {
        console.log("panel types ", data);
        // setPanelTypes(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);
  //

  //
  useEffect(() => {
    fetch("http://backend:4000/colors")
      .then((res) => res.json())
      .then((data) => {
        console.log("colors ", data);
        // setPanelTypes(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);
  //

  //
  useEffect(() => {
    fetch("http://backend:4000/manufacturers")
      .then((res) => res.json())
      .then((data) => {
        console.log("manufacturers ", data);
        // setPanelTypes(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);
  //

  useEffect(() => {
    if (selectedPanel) {
      setWidthValue(selectedPanel.width);
      setHeightValue(selectedPanel.height);
      setDepthValue(selectedPanel.depth);
      setColorRGB(selectedPanel.color); // assuming it's RGB or a valid color string
    }
  }, [selectedPanel]);

  const footerContent = (
    <div>
      <Button
        label="Close"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={() => {
          const newScale = [
            (widthValue ?? 1000) / 1000,
            (heightValue ?? 1000) / 1000,
            (depthValue ?? 1000) / 1000,
          ];

          switch (selectedPanel?.panelKey) {
            case "top":
              setTopPanelScale(newScale);
              break;
            case "left":
              setLeftPanelScale(newScale);
              break;
            case "right":
              setRightPanelScale(newScale);
              break;
            case "back":
              setBackPanelScale(newScale);
              break;
            case "glass":
              setGlassScale(newScale);
              break;
            case "base":
              setBaseScale(newScale);
              break;
            default:
              break;
          }

          setVisible(false);
        }}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <div className="card">
        <Dialog
          header={selectedPanel?.name || "Panel Info"}
          visible={visible}
          style={{ width: "20vw", height: "50vh" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          footer={footerContent}
        >
          <FloatLabel className="mt-4">
            <InputNumber
              id="width-input"
              value={widthValue}
              onValueChange={(e) => setWidthValue(e.value)}
            />
            <label htmlFor="width-input">Width (mm)</label>
          </FloatLabel>
          <FloatLabel className="mt-4">
            <InputNumber
              id="height-input"
              value={heightValue}
              onValueChange={(e) => setHeightValue(e.value)}
            />
            <label htmlFor="height-input">Height (mm)</label>
          </FloatLabel>
          <FloatLabel className="mt-4">
            <InputNumber
              id="depth-input"
              value={depthValue}
              onValueChange={(e) => setDepthValue(e.value)}
            />
            <label htmlFor="depth-input">Depth (mm)</label>
          </FloatLabel>
          {/* 
          <div className="mt-3 flex align-items-center gap-2">
            <label htmlFor="">Panel color</label>
            <ColorPicker
              format="rgb"
              value={colorRGB}
              onChange={(e) => setColorRGB(e.value)}
            />
          </div> */}
        </Dialog>
      </div>

      <div className="axes">
        <p>AXES</p>
        <div>
          <Badge value="x" severity="success"></Badge>
          <Badge value="y" severity="info"></Badge>
          <Badge value="z" severity="danger"></Badge>
        </div>
      </div>

      <Canvas shadows camera={{ position: [5, 3, 10], fov: 60 }}>
        {/* illuminate my elemnet from an angle */}
        <pointLight position={[4, 2, 4]} intensity={10} color="white" />;
        {/* illuminate my element from the top, responsible for shadows */}
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Origin />
        {/* "panelData" is the "panelInfo" taken from each element once clicked.It is an object */}
        <TopPanel
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: "top" });
            setVisible(true);
          }}
          positionProp={[3, 4, 0]}
          dimensionsPropInMeters={topPanelScale}
        />
        <LeftSidePanel
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: "left" });
            setVisible(true);
          }}
          positionProp={[2, 0, 0]}
          dimensionsPropInMeters={leftPanelScale}
        />
        <BackPanel
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: "back" });
            setVisible(true);
          }}
          positionProp={[3, 0, -1]}
          dimensionsPropInMeters={backPanelScale}
        />
        <RightSidePanel
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: "right" });
            setVisible(true);
          }}
          positionProp={[4, 0, 0]}
          dimensionsPropInMeters={rightPanelScale}
        />
        <Glass
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: "glass" });
            setVisible(true);
          }}
          positionProp={[2.5, 0, 2]}
          dimensionsPropInMeters={glassScale}
        />
        <Base
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: "base" });
            setVisible(true);
          }}
          positionProp={[3, 0, 0]}
          dimensionsPropInMeters={baseScale}
        />
        <Ground />
        <OrbitControls target={[4, 0, 0]} />
      </Canvas>
    </>
  );
}

export default WardrobeComponent;
