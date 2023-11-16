export const NoData = () => {
  return (
    <div className="flex flex-col gap-6 text-center text-primary-10">
      <div>
        <p className="text-lg font-medium">Desculpe,</p>
        <p className="font-light">
          no momento você não tem nenhuma aplicação cadastrada :(
        </p>
      </div>
      <div>
        <p className="font-light">
          Clique no ícone “+” e realize uma aplicação.
        </p>
      </div>
    </div>
  )
}
