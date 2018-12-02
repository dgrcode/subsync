const timestampToMilis = require('./timestampToMilis.js')

describe(`timestampToMilis`, () => {
  it(`should convert accurately from milis to milis`, () => {
    expect(timestampToMilis('00:00:00,123')).toBe(123)
    expect(timestampToMilis('00:00:00,000')).toBe(0)
    expect(timestampToMilis('00:00:00,100')).toBe(100)
    expect(timestampToMilis('00:00:00,001')).toBe(1)
  })

  it(`should convert accurately from seconds to milis`, () => {
    expect(timestampToMilis('00:00:01,000')).toBe(1000)
    expect(timestampToMilis('00:00:1,000')).toBe(1000)
    expect(timestampToMilis('00:00:23,000')).toBe(23000)
  })

  it(`should convert accurately from minutes to milis`, () => {
    expect(timestampToMilis('00:01:00,000')).toBe(60000)
    expect(timestampToMilis('00:1:00,000')).toBe(60000)
    expect(timestampToMilis('00:05:00,000')).toBe(300000)
  })

  it(`should convert accurately from hours to milis`, () => {
    expect(timestampToMilis('01:00:00,000')).toBe(3600000)
    expect(timestampToMilis('1:00:00,000')).toBe(3600000)
  })

  it(`should convert accurately when the timestamp combines multiple units`, () =>
    expect(timestampToMilis('01:01:23,123')).toBe(3600000 + 60000 + 23000 + 123)
  )
})