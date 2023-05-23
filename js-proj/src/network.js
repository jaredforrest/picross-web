import { origin } from "./util";
/**
 * Send a request to the server to check if the username if available
 * @param {string} levelName - name to send the server
 * @returns {Promise<string>} - the string that the server replies with, a blank string means no error
 */
export function checkUsername(levelName) {
  const url = new URL("/valid_name", origin);
  url.searchParams.append("name", levelName);
  return fetch(url).then((response) => response.text());
}
/**
 * Send a new puzzle to the server to add to db
 * @param {string} levelName - name to send the server
 * @param {[number[][], number[][]]} levelData - gridData to send the server
 * @returns {Promise<string>} - the string the server responds with, currently nothing
 */
export function uploadPuzzle(levelName, levelData) {
  return fetch(new URL("puzzles/add", origin), {
    method: "POST",
    body: JSON.stringify({
      name: levelName,
      data: levelData,
    }),
  }).then((response) => response.text());
}
