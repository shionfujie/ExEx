chrome.runtime.onMessage.addListener(message => {
  switch (message.type) {
    case "extract book info":
      clipBookInformation();
      return;
  }
});

function clipBookInformation() {
  const productTitle = document.getElementById("productTitle");
  if (productTitle === undefined) {
    console.debug("cannot find book title, perhaps not on a product page?");
    return;
  }
  const contributors = Array.from(
    document
      .getElementById("bylineInfo")
      .getElementsByClassName("contributorNameID")
  );
  var imgSrc = "";
  var img = document.getElementById("imgBlkFront");
  if (img === null) {
    img = document.getElementById("ebooksImgBlkFront");
  }
  if (img !== null) {
    imgSrc = img.src;
  }

  const newClip =
    contributors.map(c => c.textContent).join(" and ") +
    ", " +
    productTitle.textContent.replace("\n", "") +
    fullResolutionURL(imgSrc);
  navigator.clipboard.writeText(newClip);
}

function fullResolutionURL(imgSrc) {
  if (!imgSrc) return imgSrc
  const parts = imgSrc.split('.')
  parts.splice(parts.length - 2, 1)
  return parts.join('.')
}
