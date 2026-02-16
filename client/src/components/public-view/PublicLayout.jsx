import { Outlet } from 'react-router-dom'
import UserHeader from '../user-view/UserHeader'

function PublicLayout() {
  return (
    <>
    <UserHeader />
       <Outlet/>
    </>
  )
}

export default PublicLayout