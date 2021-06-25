/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 13:42:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/opening/steps.ts
 */
import { ContinueFooter, GenericFooter } from './components/Footer'

export const isConfirmationStep = (stepIndex?: number): boolean => stepIndex === 0

export const steps = [
  {
    id: '1',
    label: '等待交易确认',
    description: undefined,
    instruction: '请在钱包中确认创建',
    footerComponent: null,
  },
  {
    id: '2',
    label: '交易提交',
    description: undefined,
    instruction: '请不要离开当前页',
    footerComponent: GenericFooter,
  },
  {
    id: '3',
    label: '验证交易',
    description: undefined,
    instruction: '请不要离开当前页',
    footerComponent: GenericFooter,
  },
  {
    id: '4',
    label: '部署智能合约',
    description: undefined,
    instruction: '请不要离开当前页',
    footerComponent: GenericFooter,
  },
  {
    id: '5',
    label: '生成您的多签钱包',
    description: undefined,
    instruction: '请不要离开当前页',
    footerComponent: GenericFooter,
  },
  {
    id: '6',
    label: '成功',
    description: '多签钱包创建成功',
    instruction: undefined,
    footerComponent: ContinueFooter,
  },
]
