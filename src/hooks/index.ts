import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store/store'

export { useBeforeUnload } from './useBeforeUnload'
export { useQuiz } from './useQuiz'
export { useResultList, useSingleResult } from './useResult'
export { useQuery } from './useQuery'
export { useConfirmModal } from './useConfirmModal'
export type { ConfirmModalProps } from './useConfirmModal'
export { useDashboard } from './useDashboard'
export { useMountedEffect } from './useMountedEffect'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
