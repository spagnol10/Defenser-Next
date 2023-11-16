import { Talhao } from "@api/talhao"
import Link from "next/link"
import { Icon } from "../Icon"
type TalhaoProps = {
  talhao: Talhao
}

export const TalhaoCard: React.FC<TalhaoProps> = ({ talhao }) => {
  return (
    <Link href={`/talhao/${talhao.id}`}>
      <div className="flex w-full justify-between border-b border-b-gray-30 px-6 py-4">
        <p className="truncate text-primary-0">{talhao.nome}</p>
        <Icon name={"arrow_forward"} className="text-gray-0" />
      </div>
    </Link>
  )
}
