const milisToTimestamp = require('./milisToTimestamp.js')

describe(`milisToTimestamp`, () => {
  it(`should convert accurately from milis to milis`, () => {
    expect(milisToTimestamp(123)).toBe('00:00:00,123')
    expect(milisToTimestamp(0)).toBe('00:00:00,000')
    expect(milisToTimestamp(100)).toBe('00:00:00,100')
    expect(milisToTimestamp(1)).toBe('00:00:00,001')
  })

  it(`should convert accurately from seconds to milis`, () => {
    expect(milisToTimestamp(1000)).toBe('00:00:01,000')
    expect(milisToTimestamp(23000)).toBe('00:00:23,000')
  })

  it(`should convert accurately from minutes to milis`, () => {
    expect(milisToTimestamp(60000)).toBe('00:01:00,000')
    expect(milisToTimestamp(300000)).toBe('00:05:00,000')
  })

  it(`should convert accurately from hours to milis`, () => {
    expect(milisToTimestamp(3600000)).toBe('01:00:00,000')
  })

  it(`should convert accurately when the timestamp combines multiple units`, () =>
    expect(milisToTimestamp(3600000 + 60000 + 23000 + 123)).toBe('01:01:23,123')
  )
})