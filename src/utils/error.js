import { formatTime } from './common'

export const logError = (name, action, info ) => {
  if (!info) {
    info = 'empty'
  }
  let time = formatTime(new Date())
  console.error(time, name, action, info)
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
}

