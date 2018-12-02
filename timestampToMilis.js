const secondsToMilis = seconds => seconds * 1000
const minutesToMilis = minutes => secondsToMilis(minutes * 60)
const hourToMilis = hours => minutesToMilis(hours * 60)

const timestampToMilis = timeStamp => {
  const [hours, minutes, secondsWithMilis] = timeStamp.split(':')
  const [seconds, milis] = secondsWithMilis.split(',')
  return hourToMilis(Number(hours)) +
    minutesToMilis(Number(minutes)) +
    secondsToMilis(Number(seconds)) +
    Number(milis)
}

module.exports = timestampToMilis
