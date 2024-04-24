"use client"
import { getMe } from "@api/getMe"
import { loginUser } from "@auth/authApi"
import { Button } from "@components/Button"
import { Drawer } from "@components/Drawer"
import { TextField } from "@components/inputFields/TextField"
import { useLayoutContext } from "@context/LayoutContext"
import { useUserContext } from "@context/userContext"
import { useMutation, useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Cookies from "universal-cookie"

type FormValues = {
  login: string
  password: string
}

const Login = () => {
  const cookies = new Cookies()
  const { register, control, handleSubmit } = useForm<FormValues>({
  })
  const { setToast } = useLayoutContext()
  const router = useRouter()
  const { setUserCtx } = useUserContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [allowGetMe, setAllowGetMe] = useState(false)
  const { mutate, isLoading } = useMutation(["login"], loginUser, {
    onSuccess: (data) => {
      cookies.set("defenserUserToken", data.token, {
        path: "/",
        expires: data.expiration
          ? new Date(data.expiration)
          : dayjs().add(45, "day").toDate(),
      })
      setAllowGetMe(true)
    },
    onError: () => {
      setToast({
        title: "Erro ao realizar login",
        description: "Usuário ou senha inválidos",
        type: "error",
      })
    },
  })

  useEffect(() => {
    if (cookies.get("defenserUserToken")) {
      setAllowGetMe(true) // adding this effect so user can't access the login page if he is already logged in
    }
  }, [])

  useQuery(["getMe"], getMe, {
    enabled: allowGetMe,
    onSuccess: (data) => {
      cookies.set("defenserUser", data, { path: "/" })
      setUserCtx(data)
      setToast({
        title: "Login realizado com sucesso",
        description: "Seja bem-vindo!",
        type: "success",
      })
      router.push("/")
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data)
  }

  useEffect(() => {
    setTimeout(() => {
      setReadOnly(false)
    }, 1000)
  }, [])

  return (
    <div className="flex h-screen flex-col items-center overflow-clip">
      <div className="relative flex h-1/2 w-[95vh] justify-center ">
        <section className=" flex h-full w-full items-center justify-center overflow-visible rounded-b-[50%] bg-primary-30 text-center align-text-top">
          <h1 className="text-3xl font-bold text-primary-0">
            Olá, seja bem-vindo
            <br /> somos ao Finance !
          </h1>
        </section>

        <div className="z-5 absolute top-[calc(100%_-_80px)] mx-auto text-center">
          <section className="flex w-[160px] items-center justify-center rounded-full bg-slate-100 drop-shadow-2xl">
            <Image
              priority
              src="/logo.svg"
              alt="Login"
              width={160}
              height={160}
            />
          </section>
        </div>
      </div>

      <section className="flex flex-col gap-4 p-6 pt-24">
        <h2 className="text-center text-lg font-bold text-primary-0">
          Que bom ter você aqui com a gente.
        </h2>

        <p className="text-center text-lg text-primary-0">
          Para conseguirmos facilitar seu dia a dia, acesse o sistema ou nos
          contate para te conhecermos melhor.
        </p>
      </section>

      <section className="mb-14 flex flex-col items-center gap-6">
        <Drawer
          open={isDrawerOpen}
          setOpen={setIsDrawerOpen}
          button={{
            text: "Acessar meu perfil",
          }}
          title={"Login"}
        >
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <TextField
              readOnly={readOnly}
              type={"email"}
              placeholder={"Digite seu Email"}
              {...register("login")}
              control={control}
              autoComplete="username"
            />
            <TextField
              readOnly={readOnly}
              type={"password"}
              placeholder={"Digite sua senha"}
              {...register("password")}
              control={control}
              autoComplete="current-password"
            />

            <Button loading={isLoading} disabled={isLoading} type="submit">
              Acessar
            </Button>
            
            <Button loading={isLoading} disabled={isLoading} type="submit">
              Criar uma conta
            </Button>
          </form>
        </Drawer>

        {/*         <div className="flex items-center gap-2">
          <h3 className="text-gray-20">Precisa de ajuda? </h3>
          <Button variant="text"> Clique aqui.</Button>
        </div> */}
      </section>
    </div>
  )
}

export default Login
