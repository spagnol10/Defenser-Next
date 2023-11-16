"use client"

import { ProductResponse, getProducts } from "@api/produtos"
import { ProductForm } from "@components/Forms/ProductForm"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Profissionais = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [currentId, setCurrentId] = useState<number | undefined>()

  return (
    <ListPage<ProductResponse>
      instancia={["Product"]}
      apiFunction={getProducts}
      title="Produtos"
      subtitle="Gerencie seus produtos"
      label={"Produto"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={ProductForm}
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
      search
    />
  )
}

export default Profissionais
