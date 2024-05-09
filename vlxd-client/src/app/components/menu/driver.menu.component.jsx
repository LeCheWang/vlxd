import React from 'react'
import { MenuDriver } from '../../constants/common'
import DriverMenuLinkItem from '../menu-link-item/driver-menu-link-item'

const DriverMenu = () => {
  return (
    <div className='flex w-full fixed bottom-0 bg-slate-200'>
      {MenuDriver.map((item, index)=> {
        return <DriverMenuLinkItem key={index} {...item} />
      })}
    </div>
  )
}

export default DriverMenu;