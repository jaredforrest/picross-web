import { origin } from "./util";

// If username not valid it returns "" otherwise "OK"

/*export async function checkUsername(levelName: string): Promise<string> {
  const url = new URL("/valid_name", origin);
  url.searchParams.append("name", levelName);
  const response = await fetch(url)
  return response.text()
}

export async function uploadPuzzle(
  levelName: string,
  levelData: [number[][], number[][]],
): Promise<string> {
  const response = await fetch(new URL("/add_new", origin), {
    method: "POST",
    body: JSON.stringify({
      name: levelName,
      data: levelData,
    }),
  })
  return response.text();
}
*/

export function checkUsername(levelName: string): Promise<string> {
  const url = new URL("/valid_name", origin);
  url.searchParams.append("name", levelName);
  return fetch(url).then((response) => response.text());
}

export function uploadPuzzle(
  levelName: string,
  levelData: [number[][], number[][]],
): Promise<string> {
  return fetch(new URL("/add_new", origin), {
    method: "POST",
    body: JSON.stringify({
      name: levelName,
      data: levelData,
    }),
  }).then((response) => response.text());
}
