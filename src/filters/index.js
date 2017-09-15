export function splitLines(str) {
  if (!str) {
    return "";
  }
  return str.toString().replace(/\r\n/g,"<br />").replace(/\r/g,"<br />").replace(/\n/g,"<br />");
}
