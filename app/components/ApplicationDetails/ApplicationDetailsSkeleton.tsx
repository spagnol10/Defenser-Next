import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
export const ApplicationDetailsSkeleton: React.FC = () => {
  return (
    <>
      <hr className="w-full border bg-[#F2F0F0]" />

      <div className="flex flex-col gap-6">
        <div>
          <p className="ml-3 text-xs font-light text-gray-10">Temperatura</p>
          <div className="flex gap-2">
            <div className="h-auto w-1 rounded-full bg-primary-40"></div>
            <div className="flex flex-col">
              <Skeleton height={20} width={80} />
              <Skeleton height={14} width={80} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <p className="ml-3 text-xs font-light text-gray-10">
            Velocidade do vento
          </p>
          <div className="flex gap-2">
            <div className="h-auto w-1 rounded-full bg-[#69ABC0]"></div>
            <div className="flex flex-col">
              <Skeleton height={20} width={60} />
              <Skeleton height={14} width={100} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <p className="ml-3 text-xs font-light text-gray-10">
            Umidade relativa do ar
          </p>
          <div className="flex gap-2">
            <div className="h-auto w-1 rounded-full bg-[#BCD28D]"></div>
            <div className="flex flex-col">
              <Skeleton height={20} width={40} />
              <Skeleton height={14} width={100} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-light text-primary-0">Chuva</p>
          <Skeleton height={20} width={40} />
          <Skeleton height={14} width={80} className="mt-1" />
        </div>
      </div>
    </>
  )
}
