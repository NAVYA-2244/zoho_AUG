import {
  ClipLoader,
  BounceLoader,
  DotLoader,
  GridLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PulseLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SyncLoader,
} from "react-spinners";
import { useThemeContext } from "../Contexts/ThemesContext";

const Loader = () => {
  const { applicationColor } = useThemeContext();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        style={{
          // background: applicationColor.cardBg1,
          backgroundColor: "transparent",
          color: applicationColor.readColor1,
        }}
        className="global-loading"
      >
        <div className="d1"></div>
        <div className="d2"></div>
      </div>
    </div>
  );
};

export default Loader;
