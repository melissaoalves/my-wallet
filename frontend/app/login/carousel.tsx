'use client'

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Carousel() {
  const [isMounted, setIsMounted] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    mode: "free",
    slides: {
      origin: "center",
      perView: 1,
      spacing: 0,
    },
  })

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 3000)
    return () => clearInterval(interval)
  }, [instanceRef])

  if (!isMounted) return null

  return (
    <div className="relative w-full h-full">
      {/* Botão anterior */}
      <button
        onClick={() => instanceRef.current && instanceRef.current.prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Botão próximo */}
      <button
        onClick={() => instanceRef.current && instanceRef.current.next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slides */}
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {[1, 2, 3].map((num) => (
          <div key={num} className="keen-slider__slide flex items-center justify-center">
            <Image
              src={`/image${num}.svg`}
              alt={`Slide ${num}`}
              width={400}
              height={300}
              className="max-h-[60%] w-auto rounded-3xl shadow-lg transition-all duration-700 ease-in-out"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  )
}
