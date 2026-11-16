import { useEffect, useState } from 'react'
import { getChicagoDateKey, getEventGroups } from '../data/events'

export default function useEventGroups() {
  const [today, setToday] = useState(getChicagoDateKey)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setToday(getChicagoDateKey())
    }, 60_000)

    return () => window.clearInterval(intervalId)
  }, [])

  return getEventGroups(today)
}
