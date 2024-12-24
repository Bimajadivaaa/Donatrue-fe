import { Fragment } from "react"

import { Feature } from "@/app/components/feature"
import { Hero } from "@/app/components/hero"

export default function HomePage() {
  return (
    <Fragment>
      <Hero />
      <Feature />
    </Fragment>
  )
}
