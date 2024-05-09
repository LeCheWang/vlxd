import React from 'react'
import { MenuAdmin } from '../../constants/common'
import MenuLinkItem from '../menu-link-item'

const AdminMenu = () => {
  return (
    <div className='flex items-center justify-between'>
      {MenuAdmin.map((item, index)=> {
        return <MenuLinkItem key={index} {...item} />
      })}
    </div>
  )
}

export default AdminMenu;