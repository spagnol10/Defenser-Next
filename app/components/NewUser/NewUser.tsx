import { getMe } from "@api/getMe"
import { Button } from "@components/Button"
import { AplicadorForm } from "@components/Forms/AplicadorForm"
import { ProductForm } from "@components/Forms/ProductForm"
import { TalhaoForm } from "@components/Forms/TalhaoForm"
import { Icon } from "@components/Icon"
import { StepForm } from "@components/StepForm"
import { useLayoutContext } from "@context/LayoutContext"
import { useUserContext } from "@context/userContext"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import clsx from "clsx"
import React, { useEffect, useState } from "react"

export const NewUser: React.FC = ({}) => {
  const [openTalhaoForm, setOpenTalhaoForm] = useState(false)
  const [openProductForm, setOpenProduct] = useState(false)
  const [openAplicadorForm, setOpenAplicadorForm] = useState(false)
  const queryClient = useQueryClient()
  const { setUserCtx } = useUserContext()
  const { setShowNewUser } = useLayoutContext()

  // using this not the ctx itself because we need to invalidate the query when there are changes to the talhao or profissonal
  const { data: userCtx } = useQuery(["getMe"], getMe, {
    onSuccess: (data) => {
      if (data) {
        setUserCtx(data)
      }
    },
  })

  useEffect(() => {
    queryClient.invalidateQueries(["getMe"])
  }, [openTalhaoForm, openAplicadorForm, openProductForm])

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-xl font-light text-primary-0">
        Bem-vindo ao Defenser.
      </h2>
      {userCtx?.usuario?.role === "Aplicador" ? (
        <p className="font-light text-gray-10">
          Não encontramos nenhum talhão cadastrado para você. Por favor, entre
          em contato com o seu produtor para que ele possa te adicionar.
        </p>
      ) : (
        <>
          <p className="font-light text-gray-10">
            Para começar a acompanhar as aplicações, cadastre as informações
            abaixo.
          </p>

          <StepForm
            open={openTalhaoForm}
            setOpen={setOpenTalhaoForm}
            icon="grass"
            title="Cadastrar talhão"
            done={Boolean(userCtx?.talhoes)}
          >
            <TalhaoForm
              shouldRedirect={false}
              setOpenDrawer={setOpenTalhaoForm}
            />
          </StepForm>

          <StepForm
            open={openProductForm}
            setOpen={setOpenProduct}
            icon="inventory_2"
            title="Cadastrar produto"
            done={Boolean(userCtx?.produtos)}
          >
            <ProductForm setOpenDrawer={setOpenProduct} />
          </StepForm>

          <StepForm
            open={openAplicadorForm}
            setOpen={setOpenAplicadorForm}
            icon="diversity_2"
            title="Cadastrar profissional"
            done={Boolean(userCtx?.aplicadores)}
          >
            <AplicadorForm
              setOpenDrawer={(value: boolean) => {
                setOpenAplicadorForm(value)
                setShowNewUser(false)
              }}
            />
          </StepForm>

          <div className="flex w-full justify-end">
            <Button
              variant="text"
              disabled={!userCtx?.talhoes || !userCtx?.produtos}
              onClick={() => setShowNewUser(false)}
            >
              <div
                className={clsx(
                  "flex items-center gap-2 text-primary-20",
                  (!userCtx?.talhoes || !userCtx?.produtos) &&
                    "cursor-not-allowed opacity-50"
                )}
              >
                <p className="font-light">Pular</p>
                <Icon name={"arrow_forward"} />
              </div>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
