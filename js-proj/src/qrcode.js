/**
 * @param {string} data
 */
export function setQrCode(data) {
  const url = new URL("https://api.qrserver.com/v1/create-qr-code/");
  url.searchParams.append("data", data);
  url.searchParams.append("size", `${150}x${150}`);
  const qrcode = /** @type {HTMLImageElement} */ (
    document.querySelector("#qrcode")
  );
  qrcode.src = url.toString();
  //return fetch(url).then((response) => console.log(response.text()));
}
