function ellipsis (txt, len = 19) {
  if (txt && txt.length > len) return txt.substr(0, len) + '…'
  return txt
}

// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function intHash (str) { // java String#hashCode
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB (i) {
  var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase()

  return '00000'.substring(0, 6 - c.length) + c
}

function str2color (str) {
  return '#' + intToRGB(intHash(str))
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function blackOrWhite (hexColor) {
  let rgb = hexToRgb(hexColor)
  var o = Math.round(((parseInt(rgb.r) * 299) +
    (parseInt(rgb.g) * 587) +
    (parseInt(rgb.b) * 114)) / 1000)
  return (o > 125) ? 'black' : 'white'
}

export {
  ellipsis,
  str2color,
  blackOrWhite
}
