export const ForecastSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 font-light">
          <h2 className="text-primary-0">Previsão do tempo</h2>
          <p className="text-sm text-gray-10">
            Informações dos próximos cinco dias.
          </p>
        </div>
        <div className="flex h-[295px] gap-4 overflow-x-scroll ">
          {Array(5)
            .fill(0)
            .map((_, i) => {
              return (
                <div
                  key={i}
                  className="flex h-[290px] min-w-[140px] animate-pulse rounded-md bg-gray-200"
                ></div>
              )
            })}
        </div>
      </div>

      <div className="flex h-36 gap-10 rounded-2xl bg-almostWhite-0 px-8 py-4 ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 ">
            <div className="h-5 w-36 animate-pulse rounded-md bg-gray-200"></div>
            <div className="h-5 w-56 animate-pulse rounded-md bg-gray-200"></div>
          </div>
          <div className="flex flex-col gap-1 ">
            <div className="h-5 w-44 animate-pulse rounded-md bg-gray-200"></div>
            <div className="h-5 w-64 animate-pulse rounded-md bg-gray-200"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 ">
            <div className="h-5 w-56 animate-pulse rounded-md bg-gray-200"></div>
            <div className="h-5 w-52 animate-pulse rounded-md bg-gray-200"></div>
          </div>
          <div className="flex flex-col gap-1 ">
            <div className="h-5 w-40 animate-pulse rounded-md bg-gray-200"></div>
            <div className="h-5 w-52 animate-pulse rounded-md bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
