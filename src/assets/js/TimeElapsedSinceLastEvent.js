const TimeElapsedSinceLastEvent = (function () {
  const localStorageKey = 'AppVAST-lastSeenTime'

  function setEventOccurrenceTime () {
    window.localStorage.setItem(localStorageKey, Date.now().toString())
  }

  function getLastEventTime () {
    return window.localStorage.getItem(localStorageKey)
  }

  function getTimeElapsedSinceLastEvent () {
    const lastEventTime = getLastEventTime()
    return Date.now() - lastEventTime
  }

  function canInitVAST () {
    const timeElapsedSinceLastEvent = getTimeElapsedSinceLastEvent()
    const diffTimeInMin = timeElapsedSinceLastEvent / (1000 * 60)
    return (timeElapsedSinceLastEvent !== null && diffTimeInMin > 5)
  }

  return {
    canInitVAST,
    setEventOccurrenceTime,
    getTimeElapsedSinceLastEvent
  }
}())

export default TimeElapsedSinceLastEvent
