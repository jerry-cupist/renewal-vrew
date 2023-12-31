'use client'

import { Header } from '@vrew/ui'
import { ChangeEvent, useState } from 'react'
import { useNavigation } from '../../hooks/navigation/useNavigation'
import { useBridgeMessageCreator } from '@vrew/modules/enfpyBridge/appBrdige/hooks/useBridgeMessageCreator'

export default function Page(): JSX.Element {
  const bridge = useBridgeMessageCreator()
  const navigation = useNavigation()

  const [logMessage, setLogMessage] = useState('log message')

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handlePressLogButton = () => {
    bridge.dev.consoleLog({
      message: logMessage,
    })
  }

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setLogMessage(e.target.value)
  }

  return (
    <>
      <Header text="SUB" />
      <h2>sub</h2>

      <br />
      <br />
      <button type="button" onClick={handleGoBack}>
        go Back
      </button>
      <br />
      <input
        type="text"
        value={logMessage}
        onChange={handleChangeMessage}
        style={{
          borderWidth: 1,
          display: 'block',
        }}
      />
      <button type="button" onClick={handlePressLogButton}>
        show on console
      </button>
      <br />
    </>
  )
}
