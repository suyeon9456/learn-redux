import React from 'react'
import Counter from '../components/Counter'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { increase, decrease, setDiff } from '../modules/counter'

function CounterContainer () {
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }),
    shallowEqual // 이전 객체와 비교해 주어 최적화할 수 있음
  ) // 계속 새로운 객체를 생성하면 리렌더링됨

  const dispatch = useDispatch()

  const onIncrease = () => dispatch(increase())
  const onDecrease = () => dispatch(decrease())
  const onSetDiff = diff => dispatch(setDiff(diff))
  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  )
}

export default CounterContainer
