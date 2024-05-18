import React, { useCallback, useRef, useState } from "react";
import Controls from "./_components/Controls";
import Canvas from "./_components/Canvas";
import styled from "styled-components";
import logo from "../../../assets/AJM.png";
import { LuDownload } from "react-icons/lu";
import { LuUpload } from "react-icons/lu";
import { ImBin } from "react-icons/im";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/user/userSlice";

const downloadURI = (uri, name) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri || "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const SIZE = 500;

const Home = () => {
  const [color, setColor] = useState("#000000");
  const [drawAction, setDrawAction] = useState("select");
  const [scribbles, setScribbles] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [isDraggable, setIsDraggable] = useState(false);
  const [images, setImages] = useState([]);
  const [ellipse, setEllipse] = useState([]);
  const [star, setStar] = useState([]);
  const [regularPolygons, setRegularPolygons] = useState([]);

  const stageRef = useRef(null);

  const handleBgClick = useCallback(() => {
    if (drawAction !== "select") return;
    stageRef.current.content.children.forEach((node) => node.stopDrag());
  }, [drawAction]);

  const handleClear = useCallback(() => {
    setScribbles([]);
    setRectangles([]);
    setCircles([]);
    setArrows([]);
    setImages([]);
    setEllipse([]);
    setStar([]);
    setRegularPolygons([]);
  }, []);

  const onImportImageSelect = useCallback((e) => {
    if (e.target.files?.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => {
        const imageUrl = URL.createObjectURL(file);
        const image = new Image(SIZE / 2, SIZE / 2);
        image.src = imageUrl;
        return image;
      });
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
    e.target.files = null;
  }, []);

  const fileRef = useRef(null);
  const onImportImageClick = useCallback(() => {
    fileRef?.current && fileRef?.current?.click();
  }, []);

  const onExportClick = useCallback(() => {
    const dataUri = stageRef?.current?.toDataURL({ pixelRatio: 3 });
    downloadURI(dataUri, "image.png");
  }, []);

  //Logout Functionality
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <HeaderContainer>
        <Logo src={logo} alt="Logo" />
        <ImportExport>
          <DeleteButton onClick={handleClear}>
            <ImBin fontSize={"20px"} fill="red" />
          </DeleteButton>
          <input
            type="file"
            ref={fileRef}
            onChange={onImportImageSelect}
            style={{ display: "none" }}
            accept="image/*"
          />
          <Button onClick={onImportImageClick}>
            <LuUpload fontSize={"20px"} />
            <ButtonContent>Import Image</ButtonContent>
          </Button>
          <Button onClick={onExportClick}>
            <LuDownload fontSize={"20px"} />
            <ButtonContent>Export</ButtonContent>
          </Button>
          <ExitButton to={"/"} onClick={handleLogout}>
            <LuLogOut fontSize={"20px"} />
            <ButtonContent>Exit</ButtonContent>
          </ExitButton>
        </ImportExport>
      </HeaderContainer>
      <HomeContainer>
        <Controls
          color={color}
          setColor={setColor}
          drawAction={drawAction}
          setDrawAction={setDrawAction}
          onImportImageSelect={onImportImageSelect}
          onImportImageClick={onImportImageClick}
          onExportClick={onExportClick}
          onClear={handleClear}
          fileRef={fileRef}
        />
        <Canvas
          stageRef={stageRef}
          drawAction={drawAction}
          color={color}
          scribbles={scribbles}
          rectangles={rectangles}
          circles={circles}
          arrows={arrows}
          onShapeClick={handleBgClick}
          isDraggable={isDraggable}
          SIZE={SIZE}
          setScribbles={setScribbles}
          setCircles={setCircles}
          setRectangles={setRectangles}
          setArrows={setArrows}
          images={images}
          setImages={setImages}
          ellipse={ellipse}
          star={star}
          regularPolygons={regularPolygons}
          setEllipse={setEllipse}
          setStar={setStar}
          setRegularPolygons={setRegularPolygons}
        />
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  padding: 0 100px;
  background-color: #1d1d1d;
`;
const HeaderContainer = styled.header`
  padding-left: 97px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  max-width: 1140px;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const DeleteButton = styled.button`
  padding: 5px;
  width: 33px;
  height: 33px;
  &.selected {
    background-color: #aba8a8;
  }
`;
const ImportExport = styled.div`
  display: flex;
  column-gap: 4px;
  row-gap: 4px;
`;
const Button = styled.button`
  padding: 5px;
  display: flex;
  align-items: center;
`;
const ExitButton = styled(Link)`
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: red;
  color: white;
  text-decoration: none;
`;
const ButtonContent = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-left: 3px;
`;

export default Home;
