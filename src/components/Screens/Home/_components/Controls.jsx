import React, { useCallback } from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { MdOutlineSquare } from "react-icons/md";
import { BiCircle } from "react-icons/bi";
import { PiArrowUpRightBold } from "react-icons/pi";
import { HiPencil } from "react-icons/hi2";
import { MdClear } from "react-icons/md";
import { BiStar } from "react-icons/bi";
import { TbOvalVertical } from "react-icons/tb";
import { BiPolygon } from "react-icons/bi";
import styled from "styled-components";

const Controls = ({ color, setColor, drawAction, setDrawAction, onClear }) => {
  const handleDrawActionChange = useCallback(
    (action) => setDrawAction(action),
    [setDrawAction]
  );

  return (
    <IconContainer>
      <Tools
        onClick={() => handleDrawActionChange("select")}
        className={drawAction === "select" ? "selected" : undefined}
      >
        <AiOutlineSelect fontSize={"20px"} />
      </Tools>
      <Tools
        onClick={() => handleDrawActionChange("rectangle")}
        className={drawAction === "rectangle" ? "selected" : undefined}
      >
        <MdOutlineSquare fontSize={"20px"} />
      </Tools>
      <Tools
        onClick={() => handleDrawActionChange("circle")}
        className={drawAction === "circle" ? "selected" : undefined}
      >
        <BiCircle fontSize={"20px"} />
      </Tools>
      <Tools
        onClick={() => handleDrawActionChange("arrow")}
        className={drawAction === "arrow" ? "selected" : undefined}
      >
        <PiArrowUpRightBold fontSize={"20px"} />
      </Tools>
      <Tools
        onClick={() => handleDrawActionChange("scribble")}
        className={drawAction === "scribble" ? "selected" : undefined}
      >
        <HiPencil fontSize={"20px"} />
      </Tools>
      <Tools
        onClick={() => handleDrawActionChange("ellipse")}
        className={drawAction === "ellipse" ? "selected" : undefined}
      >
        <TbOvalVertical fontSize={"20px"} />
      </Tools>
      <Tools
        onClick={() => handleDrawActionChange("star")}
        className={drawAction === "star" ? "selected" : undefined}
      >
        <BiStar fontSize={"20px"} />
      </Tools>
      <Tools
        onClick={() => handleDrawActionChange("regularPolygon")}
        className={drawAction === "regularPolygon" ? "selected" : undefined}
      >
        <BiPolygon fontSize={"20px"} />
      </Tools>
      <InputColor
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      ></InputColor>
      <Tools onClick={onClear}>
        <MdClear fontSize={"20px"} />
      </Tools>
    </IconContainer>
  );
};

const IconContainer = styled.div`
  width: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  height: 150px;
`;
const Tools = styled.button`
  padding: 5px;
  width: 33px;
  height: 33px;
  &.selected {
    background-color: #aba8a8;
  }
`;
const InputColor = styled.input`
  width: 33px;
  height: 33px;
`;

export default Controls;
