import React from "react";

export default function Die(props) {
  let classValue = "";
  let dotCount = 0;
  let dotRendered = [];
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff",
  };

  switch (props.value) {
    case 1:
      classValue = "die-one";
      dotCount++;
      break;
    case 2:
      classValue = "die-two";
      dotCount += 2;
      break;
    case 3:
      classValue = "die-three";
      dotCount += 3;
      break;
    case 4:
      classValue = "die-four";
      dotCount += 4;
      break;
    case 5:
      classValue = "die-five";
      dotCount += 5;
      break;
    case 6:
      classValue = "die-six";
      dotCount += 6;
  }
  classValue += " die-num";

  for (let i = 0; i < dotCount; i++) {
    dotRendered.push(<div key={i} className="dot"></div>);
  }

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <div className={classValue}>{dotRendered}</div>
    </div>
  );
}
