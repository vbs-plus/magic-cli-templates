import { describe, expect, it } from 'vitest'
import { one } from '../../src/commands/zi'

describe('should', () => {
  it('exported', () => {
    expect(one).toEqual(1)
  })
})
