/**
 * TODO
 *  * The duration doesn't seem to be needed, at least with just one marker. It
 *  might be easier to deal with durations when we have multiple markers
 * 
 */

const fs = require('fs')
const path = require('path')
const timestampToMilis = require('./timestampToMilis.js')
const milisToTimestamp = require('./milisToTimestamp.js')
const showError = require('./showError.js')

const [node, programFile, ...programArguments] = process.argv

const [pathToFile, ...marks] = programArguments

if (!fs.existsSync(pathToFile)) {
  showError('ERROR Reading file',
  `We couldn't find the file ${pathToFile}`,
  '',
  `Please, make sure you're using the right command. For example`,
  `\tnode subs.js path/to/file.srt 1->01:02:03,456`
  )
  process.exit(1)
}

if (marks.length > 1) {
  showError('ERROR Multiple markers not supported yet',
  `You'll have to use only 1 marker`,
  '',
  `Please, make sure you're using the right command. For example`,
  `\tnode subs.js path/to/file.srt 1->01:02:03,456`
  )
  process.exit(1)
}

if (marks.length === 0) {
  console.log(`You didn't add any marker. The output file will be the same as the input`)
  process.exit()
}

let affectedMarker
let correctTime
try {
  [affectedMarker, correctTime] = marks[0].split('::')
  affectedMarker = Number(affectedMarker)
} catch (error) {
  showError('ERROR Incorrect marker format',
  `Markers must have the format INDEX::TIMESTAMP`,
  `and timestamps must have the format hh:mm:ss,mil`,
  '',
  `Please, make sure you're using the right command. For example`,
  `\tnode subs.js path/to/file.srt 1->01:02:03,456`
  )
  process.exit(1)
}

let correctTimeMilis
try {
  if (correctTime.split(':').length !== 3) {
    throw new Error('Incorrect timestamp format')
  }
  correctTimeMilis = timestampToMilis(correctTime)
} catch (error) {
  showError('ERROR Incorrect timestamp format',
  `Timestamps must have the format hh:mm:ss,mil`,
  '',
  `Please, make sure you're using the right command. For example`,
  `\tnode subs.js path/to/file.srt 1->01:02:03,456`
  )
  process.exit(1)
}

const subsArray = fs.readFileSync(pathToFile)
  .toString()
  .trim()
  .replace(/(\r\n|\r|\n)/g, '\n')
  .split('\n\n')
  .map(subBlock => {
    const [index, times, ...text] = subBlock.split('\n')
    if (!index) return

    const [timeFrom, timeTo] = times.split(' --> ')
    const fromTimestamp = timestampToMilis(timeFrom)
    const toTimestamp = timestampToMilis(timeTo)
    const duration = toTimestamp - fromTimestamp

    return {
      index: Number(index),
      times: {
        from: fromTimestamp,
        to: toTimestamp,
        duration: duration
      },
      text
    }
  })

/**
 * _delay_ can be an ambiguous term. The delay is the difference between the correct location
 * vs the current location of the subtitles. Therefore, a positive delay means the subtitles
 * should be moved forwards
 */
let delay
const processedSubsArray = subsArray.map(subBlock => {
  if (subBlock === undefined) return
  if (subBlock.index < affectedMarker) return subBlock
  if (subBlock.index === affectedMarker) {
    delay = correctTimeMilis - subBlock.times.from
  }

  const nextFrom = subBlock.times.from + delay
  const nextTo = subBlock.times.to + delay

  subBlock.times = {
    from: nextFrom,
    to: nextTo
  }

  return subBlock
})

const output = processedSubsArray.reduce((acc, {
  index,
  times: {
    from,
    to,
    duration
  },
  text
} = {}) => {
  if (index === undefined) return acc
  return acc + `
${index}
${milisToTimestamp(from)} --> ${milisToTimestamp(to)}
${text.join(`\n`)}
`
}, '')

const pathToFileObj = path.parse(pathToFile)

const outputPath = path.join(pathToFileObj.dir, `${pathToFileObj.name}_sync${pathToFileObj.ext}`)

fs.writeFileSync(outputPath, output)

console.log('\x1b[1m\x1b[92m%s\x1b[0m', 'Success!')
console.log(`We've created ${pathToFileObj.name}_sync${pathToFileObj.ext} in the same folder`);
