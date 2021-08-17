import React from "react";

import { Toggler } from "../Toggler";

type SoundTogglerProps = {
  isSoundOn: boolean;
  toggleSound: () => void;
};

/**
 * SoundToggler
 * 
 * Toggler to change user's sound setting.
 * 
 * @param isSoundOn current status of sound setting
 * @param toggleSound function called when user changes sound setting
 */
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
