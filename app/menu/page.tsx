"use client"
import { useUserContext } from "@context/userContext"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Cookies from "universal-cookie"
import { Button } from "../components/Button"
import { Icon } from "../components/Icon"

const menus = [
  /*   {
    name: "Talhões",
    icon: "outdoor_garden",
    path: "/menu/talhoes",
  }, */
  {
    name: "Profissionais",
    icon: "diversity_2",
    path: "/menu/profissionais",
    allowedRoles: ["Produtor"],
  },
  {
    name: "Produtos",
    icon: "inventory_2",
    path: "/menu/produtos",
    allowedRoles: ["Produtor"],
  },
]

const Menu = () => {
  const cookies = new Cookies()
  const router = useRouter()
  const { userCtx } = useUserContext()
  const queryClient = useQueryClient()

  return (
    <div className="flex h-[calc(100vh-144px-88px)] flex-col justify-between overflow-y-scroll">
      <div className="first:border-t first:border-primary-40">
        {menus.map((menu, index) => {
          if (
            !menu.allowedRoles.includes(userCtx?.usuario?.role || "Aplicador")
          ) {
            return null
          }

          return (
            <Link href={menu.path} key={index}>
              <div className="flex items-center justify-between border-b border-primary-40 p-6">
                <div className="flex items-center gap-4">
                  <Icon name={menu.icon} />

                  <span className="text-lg text-primary-10">{menu.name}</span>
                </div>
                <Icon
                  className="h-5 w-5 text-primary-10"
                  name={"arrow_forward_ios"}
                />
              </div>
            </Link>
          )
        })}
      </div>

      <Button
        variant="text"
        onClick={() => {
          cookies.remove("defenserUserToken")
          cookies.remove("defenserUser")
          queryClient.clear()
          router.push("/login")
        }}
        className="bottom-0 p-6"
      >
        <div className="flex gap-4 text-[#A82020]">
          <Icon name={"logout"} />
          <span>Sair da conta</span>
        </div>
      </Button>
    </div>
  )
}

export default Menu
