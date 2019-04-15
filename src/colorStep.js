const colorStep = (inputInt, maxInt, minInt, colorPalette) => {
  const dLength = colorPalette.length - 1

  const isBetween = inputInt > maxInt || inputInt < minInt ? false : true

  if (isBetween) {
    const d = maxInt - minInt
    const dInt = inputInt - minInt
    const colorIndex = Math.floor(dInt / (d / dLength))

    return colorPalette[colorIndex]
  } else {
    return undefined
  }
}

module.exports = colorStep
