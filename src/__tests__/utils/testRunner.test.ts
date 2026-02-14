import { describe, it, expect, vi, beforeEach } from 'vitest'
import { runPracticeTest } from '../../utils/testRunner.js'

vi.mock('node:child_process', () => ({
  execFile: vi.fn(),
}))

import { execFile } from 'node:child_process'

const mockExecFile = vi.mocked(execFile)

describe('testRunner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('runPracticeTest', () => {
    it('テスト成功時、success: true と出力を返す', async () => {
      mockExecFile.mockImplementation((_cmd, _args, _opts, callback) => {
        const cb = (typeof _opts === 'function' ? _opts : callback) as (
          error: null,
          stdout: string,
          stderr: string,
        ) => void
        cb(null, 'Tests passed\n 3 passed', '')
        return undefined as never
      })

      const result = await runPracticeTest(1)
      expect(result).toEqual({
        success: true,
        output: 'Tests passed\n 3 passed',
      })
    })

    it('テスト失敗時、success: false と出力を返す', async () => {
      mockExecFile.mockImplementation((_cmd, _args, _opts, callback) => {
        const cb = (typeof _opts === 'function' ? _opts : callback) as (
          error: Error | null,
          stdout: string,
          stderr: string,
        ) => void
        const error = new Error('Tests failed') as Error & {
          code: number
          stdout: string
          stderr: string
        }
        error.code = 1
        error.stdout = '1 failed, 2 passed'
        error.stderr = ''
        cb(error, '1 failed, 2 passed', '')
        return undefined as never
      })

      const result = await runPracticeTest(1)
      expect(result).toEqual({
        success: false,
        output: '1 failed, 2 passed',
      })
    })

    it('正しいコマンドと引数で実行される', async () => {
      mockExecFile.mockImplementation((_cmd, _args, _opts, callback) => {
        const cb = (typeof _opts === 'function' ? _opts : callback) as (
          error: null,
          stdout: string,
          stderr: string,
        ) => void
        cb(null, '', '')
        return undefined as never
      })

      await runPracticeTest(3)

      expect(mockExecFile).toHaveBeenCalledWith(
        expect.stringContaining('vitest'),
        expect.arrayContaining([
          'run',
          '--config',
          'vitest.practice.config.ts',
          '--reporter=verbose',
          'practices/practice3/',
        ]),
        expect.any(Object),
        expect.any(Function),
      )
    })
  })
})
