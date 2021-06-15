chrome.runtime.onMessage.addListener(message => {
  switch (message.type) {
    case "extract book info":
      clipBookInformation();
      return;
  }
});

const authorship = {
  "www.amazon.com": "(Author)",
  "www.amazon.co.jp": "(著)"
}

function clipBookInformation() {
  var title = document.title
  title = title.replace(/\s+[(]\d+[)]/, '')
  var parts = title.split(': ')
  if (parts[0].includes('Amazon.')) parts = parts.slice(1)
  console.log(parts)
  // Trimming a sequence of number, a probably some serial number
  // var idx = parts.findIndex(_ => _.match(/^\d+$/))
  // console.log(idx)
  // if (idx > -1) {
  //     return LinkMarkdown(parts.slice(0, idx).join(': '))
  // }

  // Will probably break if the page is for instance about a book series
  // Also breaks in the case for best sellers
  title = parts[0] + ': ' + parts[parts.length - 2]

  title = title.replace(/\s*([(][^)]+[)]|eBook)/g, '')

  var imgSrc = "";
  var img = document.getElementById("imgBlkFront");
  if (img === null) {
    img = document.getElementById("ebooksImgBlkFront");
  }
  if (img !== null) {
    imgSrc = img.src;
  }

  const newClip = title + '\n\n' +
    fullResolutionURL(imgSrc);
  navigator.clipboard.writeText(newClip);
}

function fullResolutionURL(imgSrc) {
  if (!imgSrc) return imgSrc
  // An extracted URL is expected to have the typical format like
  // https://images-na.ssl-images-amazon.com/images/I/41MGPHqDIxL._SX396_BO1,204,203,200_.jpg
  // , where the part '._SX396_BO1,204,203,200_' stands for image 
  // resolution. The following lines straight-forwardly remove 
  // that part.
  const r = /\._SX\d\d\d_...,\d\d\d,\d\d\d,\d\d\d_/
  return imgSrc.replace(r, '')
}
