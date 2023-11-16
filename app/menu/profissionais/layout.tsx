import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[calc(100vh-86px-88px)] overflow-y-scroll">
      {children}
    </div>
  )
}
