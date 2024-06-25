import { filterChange } from "../reducers/filterReducer"
import { useSelector, useDispatch } from "react-redux"

const Filter = () => {
  const anecdotes = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      fliter<input type="text" onChange={handleFilterChange} />
    </div>
  )
}

export default Filter