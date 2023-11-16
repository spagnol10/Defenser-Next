import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menus = [
  {
    title: "Início",
    icon: "home",
    link: "/",
    alt: "Início",
  },
  {
    title: "Aplicações",
    icon: "grass",
    link: "/aplicacoes",
  },
  {
    title: "Menu",
    icon: "more_horiz",
    link: "/menu",
  },
]

export const Links = () => {
  const pathname = usePathname()

  return (
    <>
      {menus.map((menu) => {
        return (
          <Link key={menu.link} href={menu.link}>
            <div
              className={clsx(
                "flex h-12 w-12 flex-col items-center justify-center gap-1",
                pathname === menu.link &&
                  "rounded-full bg-primary-40 shadow-[0px_2px_14px_rgba(8,112,217,0.25)] "
              )}
            >
              <span
                className={clsx(
                  "material-symbols-outlined ",
                  pathname === menu.link ? "text-white" : "text-gray-25"
                )}
              >
                {menu.icon}
              </span>

              {pathname !== menu.link && (
                <span className="text-xs text-gray-25">{menu.title}</span>
              )}
            </div>
          </Link>
        )
      })}
    </>
  )
}
