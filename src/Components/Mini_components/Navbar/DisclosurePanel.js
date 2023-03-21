import React from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useGlobleContext } from "../../../Context/Globle_Context";
import { useAuthContext } from "../../../Context/AuthContext";
const DisclosurePanel = (props) => {
  const {enabled}=useGlobleContext()
  const {user}=useAuthContext()
  const { classNames, navigation,setNavigation } = props.class;
  return (
    <>
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as={Link}
              to={!item.auth?item.href:user?item.href:'/login'}
              onClick={() => {
                setNavigation({ type: "setCurrent", payload: item });
              }}
              className={classNames(
                item.current
                  ? "bg-pink-700 text-white"
                  : enabled?"text-gray-300 hover:bg-gray-700 hover:text-white":"text-black hover:bg-gray-300 hover:text-gray-700",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
            
                {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </>
  );
};

export default DisclosurePanel;
