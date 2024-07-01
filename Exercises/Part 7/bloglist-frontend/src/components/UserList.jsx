import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import Table from 'react-bootstrap/Table';

// or less ideally
import { Table } from 'react-bootstrap';

const UserList = () => {
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.blogList.groups)

  return (
    <div>
      <h1>Users</h1>

      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groups).map(([key, value]) => (
            <tr key={key}>
              <th>
                <Link to={`/users/${key}`}>{value.user.name}</Link>
              </th>
              <th>{value.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
