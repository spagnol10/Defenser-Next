import { ProdutoAplicacao } from "@api/produtos"
import React from "react"

type Props = {
  products: ProdutoAplicacao[]
}

export const ApplicationProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center">
          <p className="text-xs font-light text-gray-10">Produto</p>
        </div>
        <div className="flex flex-col gap-4">
          {products?.map((productContainer, index) => (
            <div key={index} className="flex items-center">
              <p className="text-sm text-primary-0">
                {productContainer.produto.nome}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center">
          <p className="text-xs font-light text-gray-10">Dosagem</p>
        </div>
        <div className="flex flex-col gap-4">
          {products?.map((productContainer) => (
            <div
              key={productContainer.produto.id}
              className="flex items-center"
            >
              <p className="text-sm text-primary-0">
                {productContainer.dosagem} {productContainer.produto.sigla}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
