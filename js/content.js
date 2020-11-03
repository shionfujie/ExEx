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
  const newClip =
    contributors.map(c => c.textContent).join(" and ") +
    ", " +
    productTitle.textContent.replace("\n", "") +
    document.getElementById("imgBlkFront").src;
  navigator.clipboard.writeText(newClip);
}
