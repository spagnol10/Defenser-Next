"use client"
import { Aplicador, getAplicadores } from "@api/aplicador"
import { AplicadorForm } from "@components/Forms"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Profissionais = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  return (
    <ListPage<Aplicador>
      instancia={["Aplicador", "Produtor"]}
      apiFunction={getAplicadores}
      title="Profissionais"
      subtitle="Gerencie seus profissionais"
      label={"Profissional"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={AplicadorForm}
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
      apiParams={[
        { key: "role", value: "Produtor" },
        { key: "role", value: "Aplicador" },
      ]}
      dividerLabel={["Produtores", "Aplicadores"]}
      search
    />
  )
}

export default Profissionais
