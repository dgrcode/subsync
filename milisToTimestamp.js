const milisToSecondsTimestamp = milis => ({
  seconds: ('0' + Math.floor(milis / 1000)).slice(-2),
  milis: ('00' + milis % 1000).slice(-3)
})
const milisToMinutesTimestamp = milis => {
  const secondsTimestamp = milisToSecondsTimestamp(milis % (60 * 1000))
  return {
    minutes: ('0' + Math.floor(milis / (60 * 1000))).slice(-2),
    seconds: secondsTimestamp.seconds,
    milis: secondsTimestamp.milis
  }
}
const milisToHoursTimestamp = milis => {
  const minutesTimestamp = milisToMinutesTimestamp(milis % (60 * 60 * 1000))
  return {
    hours: ('0' + Math.floor(milis / (60 * 60 * 1000))).slice(-2),
    minutes: minutesTimestamp.minutes,
    seconds: minutesTimestamp.seconds,
    milis: minutesTimestamp.milis
  }
}

const milisToTimestamp = milis => {
  const obj = milisToHoursTimestamp(milis)
  return `${obj.hours}:${obj.minutes}:${obj.seconds},${obj.milis}`
}

module.exports = milisToTimestamp
