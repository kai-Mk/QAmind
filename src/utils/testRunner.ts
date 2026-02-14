import { execFile } from 'node:child_process'
import { join } from 'node:path'
import type { TestResult } from '../types.js'

const VITEST_BIN = join('node_modules', '.bin', 'vitest')

export const runPracticeTest = (
  practiceNumber: number,
): Promise<TestResult> => {
  return new Promise((resolve) => {
    execFile(
      VITEST_BIN,
      [
        'run',
        '--config',
        'vitest.practice.config.ts',
        '--reporter=verbose',
        `practices/practice${practiceNumber}/`,
      ],
      { cwd: process.cwd() },
      (error, stdout) => {
        if (error) {
          resolve({
            success: false,
            output: stdout || error.message,
          })
        } else {
          resolve({
            success: true,
            output: stdout,
          })
        }
      },
    )
  })
}
