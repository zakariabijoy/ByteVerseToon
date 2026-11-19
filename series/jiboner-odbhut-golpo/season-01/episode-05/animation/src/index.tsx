import React from "react";
import { registerRoot, Composition, Still } from "remotion";
import { Episode } from "./Episode";
import { Cover } from "./Cover";
import config from "./episode-config.json";
registerRoot(() => (
  <>
    <Composition
      id="Episode05"
      component={Episode}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={config.frames}
    />
    <Still id="Episode05Cover" component={Cover} width={1080} height={1920} />
  </>
));
