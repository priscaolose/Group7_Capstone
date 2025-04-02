import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";
import { useLocation } from "react-router-dom";

const Tutorial = () => {
  const [runTutorial, setRunTutorial] = useState(false);

  useEffect(() => {
    const newUser = localStorage.getItem("newUser") || "false";
    /*const tutorialDone = localStorage.getItem("tutorialCompleted");
    if (newUser == "true" && tutorialDone != "true"){
      setRunTutorial(true);
    }*/
    if (newUser == "true"){
      setRunTutorial(true);
    }
  }, []);

  const steps = [
    {
      target: ".MuiBox-root.css-l3g0az",
      content: "Welcome to Focus, this is your dashboard.",
    },
    {
      target: ".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-n1x4gb:nth-of-type(2)",
      content: "Here you can see your past, current, and future tasks.",
    },
    {
      target: ".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.css-p7ag8j:nth-of-type(1)",
      content: "You can set a timer to stay on track.",
    },
    {
      target: ".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.css-p7ag8j:nth-of-type(2)",
      content: "Add new tasks to keep track of what you need to get done.",
    },
    {
      target: ".MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.css-p7ag8j:nth-of-type(3)",
      content: "Manage your existing tasks to edit or delete them.",
    },
    {
      target: ".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-n1x4gb:nth-of-type(1)",
      content: "And finally, an area to take notes to stay organized.",
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={runTutorial}
      continuous
      showSkipButton
      callback={(data) => {
        if (data.status === "finished" || data.status === "skipped") {
          //localStorage.setItem("tutorialCompleted", "true");
          localStorage.setItem("newUser", "false");
        }
      }}
    />
  );
};

export default Tutorial;
