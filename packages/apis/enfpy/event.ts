export type EventListener<T> = (event: T) => void

export type EventSubscription = {
  remove: () => void
}

export const createEventEmitter = <T>() => {
  const eventListener: Record<string, EventListener<T>[]> = {}

  const addEventListener = (
    eventName: string,
    listener: EventListener<T>,
  ): EventSubscription => {
    if (!eventListener[eventName]) {
      eventListener[eventName] = []
    }

    eventListener[eventName].push(listener)

    return {
      remove: () => {
        eventListener[eventName] = eventListener[eventName].filter(
          registeredListener => registeredListener !== listener,
        )
      },
    }
  }

  const emit = (eventName: string, event: T) => {
    eventListener[eventName]?.forEach(listener => listener(event))
  }

  return {
    addEventListener,
    emit,
  }
}
