import React from "react";

import { Toggler } from "../Toggler";

type SoundTogglerProps = {
  isSoundOn: boolean;
  toggleSound: () => void;
};

export const SoundToggler = ({ isSoundOn, toggleSound }: SoundTogglerProps) => (
  <Toggler
    title="Sound"
    onToggle={toggleSound}
    isOn={isSoundOn}
    onLabel="🔊"
    offLabel="🔇"
    ariaLabel={isSoundOn? "Turn off sound." : "Turn on sound."}
  />
);
