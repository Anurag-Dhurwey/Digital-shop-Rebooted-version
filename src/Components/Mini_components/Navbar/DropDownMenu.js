
import React ,{ Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {Link,useNavigate} from 'react-router-dom'
import { useAuthContext } from '../../../Context/AuthContext'
import { removeToken } from '../../../Context/Mini_fuctions/AuthToken'
const DropDownMenu = ({classNames}) => {
  const {user,setUser}=useAuthContext()
  const navigate=useNavigate()

  const handleLogout = () => {
    removeToken();
    setUser(false)
    navigate("/signin", { replace: true });
  };

  return (
    <>
     <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://th.bing.com/th/id/R.7b528d6309ee84dc0d8fbffef7cc9347?rik=o5c5sfAZyc8IYg&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2009%2f11%2fuser-icon_291700.jpg&ehk=fHg%2b5OocbzHvhnd4uHQgbLbzHw7cwTG4GXD1aIrXnts%3d&risl=&pid=ImgRaw&r=0"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                      {user?<><Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                          onClick={handleLogout}
                            to="/login"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Log out
                          </Link>
                        )}
                      </Menu.Item></>:<><Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/login"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Login
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/register"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Register
                          </Link>
                        )}
                      </Menu.Item>
                      </>}
                      {/* on logged in  */}
                    </Menu.Items>
                  </Transition>
                </Menu> 
    </>
  )
}

export default DropDownMenu
