import React from 'react'
import { Switch } from '@headlessui/react'
import { useGlobleContext } from '../../../Context/Globle_Context'
const DarkModeBtn = () => {
    const {enabled, setEnabled} =useGlobleContext() 
  return (
    <>
      
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-teal-300' : 'bg-teal-900'}
          relative inline-flex h-[15px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[11px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    
    </>
  )
}

export default DarkModeBtn
