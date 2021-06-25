/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 14:55:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Apps/components/LegalDisclaimer.tsx
 */
import React from 'react'
import { FixedDialog, Text } from '@gnosis.pm/safe-react-components'

interface OwnProps {
  onCancel: () => void
  onConfirm: () => void
}

const LegalDisclaimer = ({ onCancel, onConfirm }: OwnProps): JSX.Element => (
  <FixedDialog
    body={
      <>
        <Text size="md">
            您现在正在访问第三方应用程序，我们不拥有，控制，维护或审计。我们不负责
            你在使用这些应用程序时可能遭受的任何损失，风险由你自己承担。
        </Text>
        <br />
        {/* <Text size="md">
          I have read and understood the{' '}
          <a href="https://gnosis-safe.io/terms" rel="noopener noreferrer" target="_blank">
            Terms
          </a>{' '}
          and this Disclaimer, and agree to be bound by them.
        </Text> */}
      </>
    }
    onCancel={onCancel}
    onConfirm={onConfirm}
    title="Disclaimer"
  />
)

export default LegalDisclaimer
