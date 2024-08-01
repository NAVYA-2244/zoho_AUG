import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImArrowRight } from "react-icons/im";
// import "./Stepper.scss";
import { useStateContext } from "../Contexts/StateContext";
import { SiTicktick } from "react-icons/si";

const Stepper = ({ arr }) => {
  // const { currentStep, setCurrentStep } = useStateContext();
  const [lineWidth, setLineWidth] = useState(0);
  const lineRef = useRef();

  const updateWidth = async () => {
    setLineWidth(lineRef.current.clientWidth);
  };

  useLayoutEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const nextStep = (step) => {
    // setCurrentStep(step);
  };
  return (
    <section className="stepper">
      {arr.map((item, index) => {
        if (index === arr.length - 1) {
          return (
            <section className="step-starting" key={item.step}>
              <div className="description-step">
                <h2 className="kinder">
                  <button onClick={() => nextStep(item.step)}>
                    <span
                      className="icon"
                      style={{
                        background:
                          item.step === currentStep ? "#FF5722" : "#2D4059",
                      }}
                    >
                      {item.move ? <SiTicktick /> : item.icon}
                    </span>
                  </button>
                </h2>
                <span className="desc">{item.info}</span>
              </div>
            </section>
          );
        } else {
          return (
            <section className="step-starting" key={item.step}>
              <div className="description-step">
                <h2 key={item.step} ref={lineRef}>
                  <button onClick={() => nextStep(item.step)}>
                    <span
                      className="icon"
                      style={{
                        background:
                          item.step === currentStep ? "#FF5722" : "#2D4059",
                      }}
                    >
                      {item.move ? <SiTicktick /> : item.icon}
                    </span>
                  </button>
                  <span className="line"></span>
                </h2>
                <span className="desc">{item.info}</span>
              </div>
            </section>
          );
        }
      })}

      <span className="line1" style={{ width: lineWidth * currentStep + "px" }}>
        <span>
          <ImArrowRight />
        </span>
      </span>
    </section>
  );
};

export default Stepper;
