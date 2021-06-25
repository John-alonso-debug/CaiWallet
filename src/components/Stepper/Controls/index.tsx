/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-25 15:11:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/components/Stepper/Controls/index.tsx
 */
import * as React from 'react'

import Button from 'src/components/layout/Button'
import Col from 'src/components/layout/Col'
import Row from 'src/components/layout/Row'
import { boldFont, sm, lg, secondary } from 'src/theme/variables'

const controlStyle = {
  backgroundColor: 'white',
  padding: lg,
  borderRadius: sm,
}

const firstButtonStyle = {
  marginRight: sm,
  fontWeight: boldFont,
  color: secondary,
}

const secondButtonStyle = {
  fontWeight: boldFont,
}

interface Props {
  buttonLabels?: string[]
  currentStep: number
  disabled: boolean
  firstPage: boolean
  lastPage: boolean
  penultimate: boolean
  onPrevious: () => void
}

const Controls = ({
  buttonLabels,
  currentStep,
  disabled,
  firstPage,
  lastPage,
  onPrevious,
  penultimate,
}: Props): React.ReactElement => {
  const back = firstPage ? '取消' : '返回'

  let next
  if (!buttonLabels) {
    // eslint-disable-next-line
    next = firstPage ? '开始' : penultimate ? '检查' : lastPage ? '提交' : '下一步'
  } else {
    next = buttonLabels[currentStep]
  }

  return (
    <Row align="center" grow style={controlStyle}>
      <Col center="xs" xs={12}>
        <Button onClick={onPrevious} size="small" style={firstButtonStyle} type="button">
          {back}
        </Button>
        <Button
          color="primary"
          disabled={disabled}
          size="small"
          style={secondButtonStyle}
          type="submit"
          variant="contained"
        >
          {next}
        </Button>
      </Col>
    </Row>
  )
}

export default Controls
