import { OptionsObject } from 'notistack'

import { getNetworkName } from 'src/config'

export const SUCCESS = 'success'
export const ERROR = 'error'
export const WARNING = 'warning'
export const INFO = 'info'

const shortDuration = 5000
const longDuration = 10000

export type NotificationId = keyof typeof NOTIFICATION_IDS

export type Notification = {
  message: string
  options: OptionsObject
  key?: string
  dismissed?: boolean
}

enum NOTIFICATION_IDS {
  UNLOCK_WALLET_MSG,
  CONNECT_WALLET_ERROR_MSG,
  SIGN_TX_MSG,
  TX_REJECTED_MSG,
  TX_EXECUTED_MSG,
  TX_CANCELLATION_EXECUTED_MSG,
  TX_FAILED_MSG,
  TX_PENDING_MSG,
  TX_WAITING_MSG,
  TX_CONFIRMATION_EXECUTED_MSG,
  TX_CONFIRMATION_FAILED_MSG,
  TX_FETCH_SIGNATURES_ERROR_MSG,
  SAFE_NAME_CHANGED_MSG,
  OWNER_NAME_CHANGE_EXECUTED_MSG,
  SIGN_SETTINGS_CHANGE_MSG,
  SETTINGS_CHANGE_REJECTED_MSG,
  SETTINGS_CHANGE_EXECUTED_MSG,
  SETTINGS_CHANGE_EXECUTED_MORE_CONFIRMATIONS_MSG,
  SETTINGS_CHANGE_FAILED_MSG,
  TESTNET_VERSION_MSG,
  SIGN_NEW_SPENDING_LIMIT_MSG,
  NEW_SPENDING_LIMIT_REJECTED_MSG,
  NEW_SPENDING_LIMIT_EXECUTED_MSG,
  NEW_SPENDING_LIMIT_EXECUTED_MORE_CONFIRMATIONS_MSG,
  NEW_SPENDING_LIMIT_FAILED_MSG,
  SIGN_REMOVE_SPENDING_LIMIT_MSG,
  REMOVE_SPENDING_LIMIT_REJECTED_MSG,
  REMOVE_SPENDING_LIMIT_EXECUTED_MSG,
  REMOVE_SPENDING_LIMIT_EXECUTED_MORE_CONFIRMATIONS_MSG,
  REMOVE_SPENDING_LIMIT_FAILED_MSG,
  WRONG_NETWORK_MSG,
  ADDRESS_BOOK_NEW_ENTRY_SUCCESS,
  ADDRESS_BOOK_EDIT_ENTRY_SUCCESS,
  ADDRESS_BOOK_IMPORT_ENTRIES_SUCCESS,
  ADDRESS_BOOK_DELETE_ENTRY_SUCCESS,
  ADDRESS_BOOK_EXPORT_ENTRIES_SUCCESS,
  ADDRESS_BOOK_EXPORT_ENTRIES_ERROR,
  SAFE_NEW_VERSION_AVAILABLE,
}

export const NOTIFICATIONS: Record<NotificationId, Notification> = {
  // Wallet Connection
  UNLOCK_WALLET_MSG: {
    message: '解锁您的钱包以连接',
    options: { variant: WARNING, persist: true, preventDuplicate: true },
  },
  CONNECT_WALLET_ERROR_MSG: {
    message: '连接到您的钱包时出错',
    options: { variant: ERROR, persist: true },
  },
  // Regular/Custom Transactions
  SIGN_TX_MSG: {
    message: '请签署交易',
    options: { variant: INFO, persist: true },
  },
  TX_REJECTED_MSG: {
    message: '交易被拒绝',
    options: { variant: ERROR, persist: false, autoHideDuration: shortDuration },
  },
  TX_EXECUTED_MSG: {
    message: '交易成功执行',
    options: { variant: SUCCESS, persist: false, autoHideDuration: shortDuration },
  },
  TX_CANCELLATION_EXECUTED_MSG: {
    message: '拒绝成功提交',
    options: { variant: SUCCESS, persist: false, autoHideDuration: shortDuration },
  },
  TX_FAILED_MSG: {
    message: '交易失败',
    options: { variant: ERROR, persist: false, autoHideDuration: shortDuration },
  },
  TX_PENDING_MSG: {
    message: '交易仍在进行中。考虑以更高的gas价格重新提交。',
    options: { variant: ERROR, persist: true, autoHideDuration: shortDuration },
  },
  TX_WAITING_MSG: {
    message: '交易需要您的确认',
    key: 'TX_WAITING_MSG',
    options: {
      variant: WARNING,
      persist: false,
      autoHideDuration: shortDuration,
      preventDuplicate: true,
    },
  },

  TX_CONFIRMATION_EXECUTED_MSG: {
    message: '确认交易成功',
    options: { variant: SUCCESS, persist: false, autoHideDuration: shortDuration },
  },
  TX_CONFIRMATION_FAILED_MSG: {
    message: '确认交易失败',
    options: { variant: ERROR, persist: false, autoHideDuration: shortDuration },
  },

  TX_FETCH_SIGNATURES_ERROR_MSG: {
    message: '无法获取此交易的所有签名。请重新加载页面并重试',
    options: { variant: ERROR, persist: true },
  },

  // Safe Name
  SAFE_NAME_CHANGED_MSG: {
    message: '钱包名称改变',
    options: { variant: SUCCESS, persist: false, autoHideDuration: shortDuration },
  },

  // Owner Name
  OWNER_NAME_CHANGE_EXECUTED_MSG: {
    message: '拥有者名称改变',
    options: { variant: SUCCESS, persist: false, autoHideDuration: shortDuration },
  },

  // Settings
  SIGN_SETTINGS_CHANGE_MSG: {
    message: '请签署设置更改',
    options: { variant: INFO, persist: true },
  },
  SETTINGS_CHANGE_REJECTED_MSG: {
    message: '设置更改被拒绝',
    options: { variant: ERROR, persist: false, autoHideDuration: shortDuration },
  },
  SETTINGS_CHANGE_EXECUTED_MSG: {
    message: '设置更改成功执行',
    options: { variant: SUCCESS, persist: false, autoHideDuration: shortDuration },
  },
  SETTINGS_CHANGE_EXECUTED_MORE_CONFIRMATIONS_MSG: {
    message: '已成功创建设置更改。执行需要更多签名确认',
    options: { variant: SUCCESS, persist: false, autoHideDuration: longDuration },
  },
  SETTINGS_CHANGE_FAILED_MSG: {
    message: '设置更改失败',
    options: { variant: ERROR, persist: false, autoHideDuration: shortDuration },
  },

  // Spending limit
  SIGN_NEW_SPENDING_LIMIT_MSG: {
    message: '请签署新的消费限额',
    options: { variant: INFO, persist: true },
  },
  NEW_SPENDING_LIMIT_REJECTED_MSG: {
    message: '新的消费限额被拒绝',
    options: { variant: ERROR, persist: false, autoHideDuration: longDuration },
  },
  NEW_SPENDING_LIMIT_EXECUTED_MSG: {
    message: '新的消费限额成功执行',
    options: { variant: SUCCESS, persist: false, autoHideDuration: longDuration },
  },
  NEW_SPENDING_LIMIT_EXECUTED_MORE_CONFIRMATIONS_MSG: {
    message: '已成功创建新的消费限额。执行需要更多确认',
    options: { variant: SUCCESS, persist: false, autoHideDuration: longDuration },
  },
  NEW_SPENDING_LIMIT_FAILED_MSG: {
    message: '新的消费限额失败',
    options: { variant: ERROR, persist: false, autoHideDuration: longDuration },
  },
  SIGN_REMOVE_SPENDING_LIMIT_MSG: {
    message: '请签署删除消费限制',
    options: { variant: INFO, persist: true },
  },
  REMOVE_SPENDING_LIMIT_REJECTED_MSG: {
    message: '删除消费限额被拒绝',
    options: { variant: ERROR, persist: false, autoHideDuration: longDuration },
  },
  REMOVE_SPENDING_LIMIT_EXECUTED_MSG: {
    message: '移除消费限制成功执行',
    options: { variant: SUCCESS, persist: false, autoHideDuration: longDuration },
  },
  REMOVE_SPENDING_LIMIT_EXECUTED_MORE_CONFIRMATIONS_MSG: {
    message: '删除消费限额已成功创建。执行需要更多确认',
    options: { variant: SUCCESS, persist: false, autoHideDuration: longDuration },
  },
  REMOVE_SPENDING_LIMIT_FAILED_MSG: {
    message: '删除消费限制失败',
    options: { variant: ERROR, persist: false, autoHideDuration: longDuration },
  },

  // Network
  TESTNET_VERSION_MSG: {
    message: "测试网版本：不要将生产资产发送到这个钱包",
    options: { variant: WARNING, persist: false, preventDuplicate: true, autoHideDuration: longDuration },
  },
  WRONG_NETWORK_MSG: {
    message: `错误网络: 请使用 ${getNetworkName()}`,
    options: { variant: WARNING, persist: true, preventDuplicate: true },
  },

  // Address book
  ADDRESS_BOOK_NEW_ENTRY_SUCCESS: {
    message: '条目创建成功',
    options: { variant: SUCCESS, persist: false, preventDuplicate: false },
  },
  ADDRESS_BOOK_EDIT_ENTRY_SUCCESS: {
    message: '条目保存成功',
    options: { variant: SUCCESS, persist: false, preventDuplicate: false },
  },
  ADDRESS_BOOK_IMPORT_ENTRIES_SUCCESS: {
    message: '已成功导入条目',
    options: { variant: SUCCESS, persist: false, preventDuplicate: false },
  },
  ADDRESS_BOOK_DELETE_ENTRY_SUCCESS: {
    message: '已成功删除条目',
    options: { variant: SUCCESS, persist: false, preventDuplicate: false },
  },
  ADDRESS_BOOK_EXPORT_ENTRIES_SUCCESS: {
    message: '地址簿导出',
    options: { variant: SUCCESS, persist: false, preventDuplicate: false },
  },
  ADDRESS_BOOK_EXPORT_ENTRIES_ERROR: {
    message: '生成地址簿 CSV 时出错。',
    options: { variant: ERROR, persist: false, preventDuplicate: false },
  },

  // Safe Version
  SAFE_NEW_VERSION_AVAILABLE: {
    message: '此钱包有一个新版本可用。现在更新！',
    options: { variant: WARNING, persist: false, preventDuplicate: true },
  },
}
