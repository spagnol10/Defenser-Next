import { Aplicador } from "@api/aplicador"

export const AplicadorCard: React.FC<{ aplicador: Aplicador }> = ({
  aplicador,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-b-gray-30 px-6 py-4 ">
      <p className="truncate text-primary-0">
        {aplicador.usuario.name || "aplicador"}
      </p>
      {/* <Icon name={"edit"} /> */}
    </div>
  )
}
