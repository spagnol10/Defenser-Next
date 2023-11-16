import { AplicadorForm, ApplicationForm, TalhaoForm } from "../Forms";
import { ProductForm } from "../Forms/ProductForm";

export const noMenuPaths = ["/aplicacoes", "/login", "/403", "/menu"]

export const menus = [
  {
    isSubMenu: true,
    path: "/talhao",
    subMenus: [
      {
        title: "Nova aplicação",
        component: ApplicationForm,
        icon: "add",
        roles: ["Produtor", 'Aplicador']
      },
      {
        title: "Editar talhão",
        component: TalhaoForm,
        icon: "edit",
        roles: ["Produtor"]
      },
    ],
  },
  {
    title: "Novo talhão",
    path: "/",
    component: TalhaoForm,
  },
  {
    title: "Novo produto",
    path: "/menu/produtos",
    component: ProductForm,
  },
  {
    title: "Novo profissional",
    path: "/menu/profissionais",
    component: AplicadorForm,
  },
]
