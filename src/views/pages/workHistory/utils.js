export const formatDuration = (duration) => {
  let hours = Math.floor(duration / (1000 * 3600));
  let minutes = Math.floor(duration / (1000 * 60)) - hours * 60;
  let seconds = Math.floor(duration / 1000) - hours * 3600 - minutes * 60;
  let str = hours ? hours + "h " : "";
  str += minutes ? minutes + "m " : "";
  str += seconds + "s ";
  return str;
};
