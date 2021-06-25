/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 13:32:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/open/components/SafeNameForm/index.tsx
 */
import { createStyles, makeStyles } from '@material-ui/core/styles'
import * as React from 'react'
import styled from 'styled-components'

import OpenPaper from 'src/components/Stepper/OpenPaper'
import Field from 'src/components/forms/Field'
import TextField from 'src/components/forms/TextField'
import { composeValidators, required, validAddressBookName } from 'src/components/forms/validator'
import Block from 'src/components/layout/Block'
import Paragraph from 'src/components/layout/Paragraph'
import { FIELD_NAME } from 'src/routes/open/components/fields'
import { secondary, sm } from 'src/theme/variables'

const styles = createStyles({
  root: {
    display: 'flex',
    maxWidth: '440px',
  },
  text: {
    flexWrap: 'nowrap',
  },
  dot: {
    marginRight: sm,
  },
  links: {
    '&>a': {
      color: secondary,
    },
  },
})

const StyledField = styled(Field)`
  &.MuiTextField-root {
    width: 460px;
  }
`

const useSafeNameStyles = makeStyles(styles)

const SafeNameForm = ({ safeName }: { safeName: string }): React.ReactElement => {
  const classes = useSafeNameStyles()

  return (
    <>
      <Block margin="lg">
        <Paragraph color="primary" noMargin size="lg">
          您将创建一个拥有一个或多个签名人的多签钱包。首先，让我们给你的新钱包起个名字。这
          名称只存储在本地，永远不会与任何人共享。
        </Paragraph>
      </Block>
      <Block className={classes.root} margin="lg">
        <StyledField
          component={TextField}
          defaultValue={safeName}
          name={FIELD_NAME}
          placeholder="名称"
          text="名称"
          type="text"
          validate={composeValidators(required, validAddressBookName)}
          testId="create-safe-name-field"
        />
      </Block>
      {/* <Block margin="lg">
        <Paragraph className={classes.links} color="primary" noMargin size="lg">
          By continuing you consent to the{' '}
          <a href="https://gnosis-safe.io/terms" rel="noopener noreferrer" target="_blank">
            terms of use
          </a>{' '}
          and{' '}
          <a href="https://gnosis-safe.io/privacy" rel="noopener noreferrer" target="_blank">
            privacy policy
          </a>
          .
        </Paragraph>
      </Block> */}
    </>
  )
}

const SafeNamePageComponent = () =>
  function SafeNamePage(controls, { values }): React.ReactElement {
    const { safeName } = values
    return (
      <OpenPaper controls={controls}>
        <SafeNameForm safeName={safeName} />
      </OpenPaper>
    )
  }

export default SafeNamePageComponent
