import React, { useCallback, useRef } from "react";
import {
  Stage,
  Layer,
  Rect as KonvaRect,
  Transformer,
  Image as KonvaImage,
  Circle as KonvaCircle,
  Line as KonvaLine,
  Arrow as KonvaArrow,
  Ellipse as KonvaEllipse,
  Star as KonvaStar,
  RegularPolygon as KonvaRegularPolygon,
} from "react-konva";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Canvas = ({
  stageRef,
  drawAction,
  color,
  scribbles,
  rectangles,
  circles,
  arrows,
  SIZE,
  setScribbles,
  setCircles,
  setRectangles,
  setArrows,
  images,
  setEllipse,
  ellipse,
  setStar,
  star,
  regularPolygons,
  setRegularPolygons,
}) => {
  const transformerRef = useRef(null);
  const currentShapeRef = useRef();

  const handleStageMouseUp = useCallback(() => {
    currentShapeRef.current = false;
  }, []);

  const handleStageMouseDown = useCallback(
    (e) => {
      if (drawAction === "select") return;
      const stage = stageRef.current;
      const pos = stage.getPointerPosition();
      const x = pos?.x || 0;
      const y = pos?.y || 0;
      const id = uuidv4();
      currentShapeRef.current = id;

      switch (drawAction) {
        case "scribble":
          setScribbles((prevScribbles) => [
            ...prevScribbles,
            {
              id,
              points: [x, y],
              color,
            },
          ]);
          break;
        case "circle":
          setCircles((prevCircles) => [
            ...prevCircles,
            {
              id,
              radius: 1,
              x,
              y,
              color,
            },
          ]);
          break;
        case "rectangle":
          setRectangles((prevRectangles) => [
            ...prevRectangles,
            {
              id,
              height: 1,
              width: 1,
              x,
              y,
              color,
            },
          ]);
          break;
        case "arrow":
          setArrows((prevArrows) => [
            ...prevArrows,
            {
              id,
              points: [x, y, x, y],
              color,
            },
          ]);
          break;
        case "ellipse":
          setEllipse((prev) => [
            ...prev,
            {
              id,
              x,
              y,
              radiusX: 0,
              radiusY: 0,
              color,
            },
          ]);
          break;
        case "star":
          setStar((prev) => [
            ...prev,
            {
              id,
              x,
              y,
              numPoints: 5,
              innerRadius: 0,
              outerRadius: 0,
              color,
            },
          ]);
          break;
        case "regularPolygon":
          setRegularPolygons((prev) => [
            ...prev,
            {
              id,
              x,
              y,
              sides: 6,
              radius: 0,
              color,
            },
          ]);
          break;
      }
    },
    [drawAction, color, setScribbles, setCircles, setRectangles, setArrows]
  );

  const handleStageMouseMove = useCallback(() => {
    if (drawAction === "select" || !currentShapeRef.current) return;
    const stage = stageRef.current;
    const id = currentShapeRef.current;
    const pos = stage.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;

    switch (drawAction) {
      case "scribble":
        setScribbles((prevScribbles) =>
          prevScribbles.map((prevScribble) =>
            prevScribble.id === id
              ? { ...prevScribble, points: [...prevScribble.points, x, y] }
              : prevScribble
          )
        );
        break;
      case "circle":
        setCircles((prevCircles) =>
          prevCircles.map((prevCircle) =>
            prevCircle.id === id
              ? {
                  ...prevCircle,
                  radius: Math.sqrt(
                    ((x - prevCircle.x) ** 2 + (y - prevCircle.y) ** 2) / 2
                  ),
                }
              : prevCircle
          )
        );
        break;
      case "rectangle":
        setRectangles((prevRectangles) =>
          prevRectangles.map((prevRectangle) =>
            prevRectangle.id === id
              ? {
                  ...prevRectangle,
                  height: y - prevRectangle.y,
                  width: x - prevRectangle.x,
                }
              : prevRectangle
          )
        );
        break;
      case "arrow":
        setArrows((prevArrows) =>
          prevArrows.map((prevArrow) =>
            prevArrow.id === id
              ? {
                  ...prevArrow,
                  points: [prevArrow.points[0], prevArrow.points[1], x, y],
                }
              : prevArrow
          )
        );
        break;
      case "ellipse":
        setEllipse((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  radiusX: Math.abs(x - item.x),
                  radiusY: Math.abs(y - item.y),
                }
              : item
          )
        );
        break;
      case "star":
        const distance = Math.sqrt((x - star[0].x) ** 2 + (y - star[0].y) ** 2);
        const outerRadius = distance / 2;
        const innerRadius = outerRadius * 0.382;
        setStar((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  outerRadius,
                  innerRadius,
                }
              : item
          )
        );
        break;
      case "regularPolygon":
        const distances = Math.sqrt(
          (x - regularPolygons[0].x) ** 2 + (y - regularPolygons[0].y) ** 2
        );
        setRegularPolygons((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  radius: distances,
                }
              : item
          )
        );
        break;
    }
  }, [drawAction, currentShapeRef, star, regularPolygons]);

  const onShapeClick = useCallback(
    (e) => {
      if (drawAction !== "select") return;
      transformerRef.current.nodes([e.currentTarget]);
    },
    [drawAction]
  );

  const isDraggable = drawAction === "select";

  const onBgClick = useCallback(
    (e) => {
      transformerRef?.current?.nodes([]);
    },
    [drawAction]
  );

  return (
    <CanvasContainer>
      <Stage
        height={550}
        width={1000}
        ref={stageRef}
        onMouseUp={handleStageMouseUp}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
      >
        <Layer>
          <KonvaRect
            x={0}
            y={0}
            height={550}
            width={1000}
            fill="white"
            id="bg"
            onClick={onBgClick}
          />
          {images.map((image, index) => (
            <KonvaImage
              key={`image-${index}`}
              image={image}
              x={0}
              y={0}
              height={SIZE / 2}
              width={SIZE / 2}
              draggable={isDraggable}
            />
          ))}
          {arrows.map((arrow) => (
            <KonvaArrow
              key={arrow.id}
              id={arrow.id}
              points={arrow.points}
              fill={arrow.color}
              stroke={arrow.color}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {rectangles.map((rectangle) => (
            <KonvaRect
              key={rectangle.id}
              x={rectangle?.x}
              y={rectangle?.y}
              height={rectangle?.height}
              width={rectangle?.width}
              stroke={rectangle?.color}
              id={rectangle?.id}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {circles.map((circle) => (
            <KonvaCircle
              key={circle.id}
              id={circle.id}
              x={circle?.x}
              y={circle?.y}
              radius={circle?.radius}
              stroke={circle?.color}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {scribbles.map((scribble) => (
            <KonvaLine
              key={scribble.id}
              id={scribble.id}
              lineCap="round"
              lineJoin="round"
              stroke={scribble?.color}
              strokeWidth={4}
              points={scribble.points}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {ellipse.map((e) => (
            <KonvaEllipse
              key={e.id}
              id={e.id}
              x={e.x}
              y={e.y}
              radiusX={e.radiusX}
              radiusY={e.radiusY}
              stroke={e.color}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {star.map((s) => (
            <KonvaStar
              key={s.id}
              id={s.id}
              x={s.x}
              y={s.y}
              numPoints={5}
              innerRadius={s.innerRadius}
              outerRadius={s.outerRadius}
              stroke={s.color}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {regularPolygons.map((r) => (
            <KonvaRegularPolygon
              key={r.id}
              id={r.id}
              x={r.x}
              y={r.y}
              sides={6}
              radius={r.radius}
              stroke={r.color}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  width: "1000px";
  height: "500px";
  border: 2px solid black;
  overflow: hidden;
`;
export default Canvas;
