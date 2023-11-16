"use client"
import { useLayoutContext } from "@context/LayoutContext"
import { useUserContext } from "@context/userContext"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Drawer } from "../Drawer"
import { Icon } from "../Icon"
import { menus, noMenuPaths } from "./menuConfig"

export const FloatingMenu: React.FC = () => {
  const path = usePathname()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([])
  const { userCtx } = useUserContext()
  const { showNewUser } = useLayoutContext()

  const id = Number(path.split("/")[2]) || undefined

  //ensures that the menu is closed when the path changes
  useEffect(() => {
    setOpenDrawer(false)
  }, [path, setOpenDrawer])

  if (
    noMenuPaths.includes(path) ||
    path.includes("/aplicacoes/") || // there needs to be a better way to do this
    showNewUser ||
    (userCtx?.usuario?.role !== "Produtor" && path === "/")
  )
    return null

  return (
    <>
      <button
        type="button"
        className="fixed bottom-24 right-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-30 "
        onClick={() => {
          setOpenDrawer(!openDrawer)
        }}
      >
        <Icon
          className={`text-white ${
            openDrawer && "rotate-[135deg]"
          } transition-transform duration-500 ease-in-out`}
          name={"add"}
        />
      </button>

      {menus.map((menu, index) => {
        // find would be better
        if (path !== menu.path && !path.includes(`${menu.path}/${id}`)) return
        if (!openDrawer) return

        if (menu.isSubMenu) {
          return (
            <div
              key={index}
              className="fixed bottom-44 right-7 z-10 flex flex-col items-center justify-center gap-2"
            >
              {menu.subMenus.map((subMenu, index) => {
                if (
                  subMenu.roles.length > 0 &&
                  !subMenu.roles.includes(userCtx?.usuario?.role!)
                )
                  return null

                const open = openSubMenus.includes(index)
                const handleClick = () => {
                  if (open) {
                    setOpenSubMenus((prev) =>
                      prev.filter((item) => item !== index)
                    )
                  } else {
                    setOpenSubMenus((prev) => [...prev, index])
                  }
                }

                return (
                  <Drawer
                    key={index}
                    title={subMenu.title}
                    open={open}
                    setOpen={handleClick}
                    button={{
                      onClick: () => handleClick(),
                      children: (
                        <Icon
                          name={subMenu.icon}
                          className={"text-primary-0"}
                        />
                      ),
                      className:
                        "flex h-10 w-10 animate-jump-in animate-duration-300 animate-delay-200 animate-ease-in items-center justify-center rounded-full border border-primary-30 bg-primary-60",
                    }}
                  >
                    <subMenu.component id={id!} setOpenDrawer={handleClick} />
                  </Drawer>
                )
              })}
            </div>
          )
        } else {
          return (
            <Drawer
              key={index}
              title={menu.title || ""}
              open={openDrawer}
              setOpen={setOpenDrawer}
            >
              {menu.component ? (
                <menu.component id={id} setOpenDrawer={setOpenDrawer} />
              ) : null}
            </Drawer>
          )
        }
      })}
    </>
  )
}
