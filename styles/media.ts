/**
 * media is used to respond to different screen widths.
 */

/**
 * mediaSizes are sizes of different screen widths, in px, as numbers.
 */
export enum mediaSizes {
  mobileS = 320,
  mobileM = 375,
  mobileL = 425,
  tablet = 768,
  laptop = 1000,
  laptopM = 1250,
  laptopL = 1440,
  desktop = 2560,
}

/**
 * mediaSizesStrings are sizes of different screen widths, in px, as strings.
 *
 * ie "<size>px"
 */
export const mediaSizesString = {
  mobileS: `${mediaSizes.mobileS}px`,
  mobileM: `${mediaSizes.mobileM}px`,
  mobileL: `${mediaSizes.mobileL}px`,
  tablet: `${mediaSizes.tablet}px`,
  laptop: `${mediaSizes.laptop}px`,
  laptopM: `${mediaSizes.laptopM}px`,
  laptopL: `${mediaSizes.laptopL}px`,
  desktop: `${mediaSizes.desktop}px`,
};

/**
 * mediaDevices are sizes of different screen widths,
 * formatted to fit into media queries as min-width arguments.
 *
 * ie "(min-width: <size>px)"
 */
export const mediaDevices = {
  mobileS: `(min-width: ${mediaSizesString.mobileS})`,
  mobileM: `(min-width: ${mediaSizesString.mobileM})`,
  mobileL: `(min-width: ${mediaSizesString.mobileL})`,
  tablet: `(min-width: ${mediaSizesString.tablet})`,
  laptop: `(min-width: ${mediaSizesString.laptop})`,
  laptopM: `(min-width: ${mediaSizesString.laptopM})`,
  laptopL: `(min-width: ${mediaSizesString.laptopL})`,
  desktop: `(min-width: ${mediaSizesString.desktop})`,
};

/**
 * media contains media queries and common device sizes.
 */
export const media = {
  mediaSizes,
  mediaSizesString,
  ...mediaDevices,
};

/**
 * isMedia checks if a given width is greater than or equal to the given mediaSize.
 * 
 * @param width width to test in px
 * @param mediaSize key of mediaSizes
 */
export const isMedia = (width: number, mediaSize: keyof typeof mediaSizes) =>
  width >= mediaSizes[mediaSize];
