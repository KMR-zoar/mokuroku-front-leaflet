const assert = require('assert')
const colorStep = require('../src/colorStep')

const colorPalette = ['0', '1', '2', '3', '4', '5', '6', '7']

const maxInt = 1500
const minInt = 1400

describe(
  '範囲内の入力値に対するレスポンス' + minInt + '以上' + maxInt + '以下',
  () => {
    it('1432 -> 2', () => {
      assert.equal(
        colorPalette[2],
        colorStep(1432, maxInt, minInt, colorPalette)
      )
    })
    it('1455 -> 3', () => {
      assert.equal(
        colorPalette[3],
        colorStep(1455, maxInt, minInt, colorPalette)
      )
    })
    it('1470 -> 4', () => {
      assert.equal(
        colorPalette[4],
        colorStep(1470, maxInt, minInt, colorPalette)
      )
    })
    it('1492 -> 6', () => {
      assert.equal(
        colorPalette[6],
        colorStep(1492, maxInt, minInt, colorPalette)
      )
    })
    it('1413 -> 0', () => {
      assert.equal(
        colorPalette[0],
        colorStep(1413, maxInt, minInt, colorPalette)
      )
    })
    it('1400 -> 0', () => {
      assert.equal(
        colorPalette[0],
        colorStep(1400, maxInt, minInt, colorPalette)
      )
    })
    it('1500 -> 7', () => {
      assert.equal(
        colorPalette[7],
        colorStep(1500, maxInt, minInt, colorPalette)
      )
    })
  }
)
describe('範囲外の値に対するレスポンス', () => {
  it('1399 -> undefined', () => {
    assert.equal(undefined, colorStep(1399, maxInt, minInt, colorPalette))
  })
  it('1501 -> undefined', () => {
    assert.equal(undefined, colorStep(1501, maxInt, minInt, colorPalette))
  })
})
