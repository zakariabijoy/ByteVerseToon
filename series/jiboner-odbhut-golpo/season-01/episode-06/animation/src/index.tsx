import React from "react";
import { registerRoot, Composition } from "remotion";
import { Episode } from "./Episode";
registerRoot(() => (
  <Composition
    id="Episode06"
    component={Episode}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={3166}
  />
));
