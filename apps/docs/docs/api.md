# API

## `createAsciiReveal(element, options)`

Returns `play(): Promise<void>`, `reset()`, `finish()`, `update(partial)`, `destroy()`, and readonly `isPlaying`.

## `generateAsciiFrame(options)`

Pure utility accepting `text`, `progress`, and the frame-related options below. Progress is clamped to `0...1`; progress `1` always returns the exact input.

## Options

| Option                 | Type                                           | Default               |
| ---------------------- | ---------------------------------------------- | --------------------- |
| `text`                 | `string`                                       | required              |
| `characters`           | `string`                                       | `A-Z`, `0-9`, symbols |
| `duration`             | `number`                                       | `700`                 |
| `delay`                | `number`                                       | `0`                   |
| `fps`                  | `number`                                       | `30`                  |
| `trigger`              | `mount \| hover \| focus \| in-view \| manual` | `mount`               |
| `direction`            | `left \| right \| center \| random`            | `left`                |
| `preserveSpaces`       | `boolean`                                      | `true`                |
| `preservePunctuation`  | `boolean`                                      | `false`               |
| `startScrambled`       | `boolean`                                      | `true`                |
| `replay`               | `boolean`                                      | `true`                |
| `seed`                 | `number`                                       | random                |
| `respectReducedMotion` | `boolean`                                      | `true`                |
| `intersectionMargin`   | `string`                                       | `0px`                 |
| `onStart`              | `() => void`                                   | —                     |
| `onUpdate`             | `(value, progress) => void`                    | —                     |
| `onComplete`           | `() => void`                                   | —                     |

Invalid durations and delays fall back to safe defaults. FPS is at least one, and an empty character set uses the default.
