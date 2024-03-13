import { combineReducers } from '@reduxjs/toolkit'
import  { SLICE_NAME, CrmDashboardState } from './crmDashboardSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'



export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: CrmDashboardState
        }
    }
> = useSelector

export * from './crmDashboardSlice'
export { useAppDispatch } from '@/store'

