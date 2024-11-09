'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Download, RefreshCw, Shuffle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const CategorySelector = ({ 
  title, 
  options, 
  selected, 
  onSelect 
}) => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0"
          onClick={() => onSelect(-1)}
        >
          ⃠
        </Button>
        {options.map((option, index) => (
          <Button
            key={option.id}
            variant={selected === index ? "default" : "outline"}
            size="icon"
            className="h-12 w-12 shrink-0"
            onClick={() => onSelect(index)}
          >
            <Image
              src={option.src}
              alt={option.alt}
              width={32}
              height={32}
              className="rounded"
            />
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
)

export default function MemeGenerator() {
  const [selectedOptions, setSelectedOptions] = useState({
    background: 0,
    skin: 0,
    wool: 0,
    outline: 0,
    eyes: 0,
    neck: 0,
    hat: -1,
    glasses: -1,
    mouth: 0,
    ears: 0,
  })

  const categories = {
    BACKGROUND: Array.from({ length: 1 }, (_, i) => ({
      id: `background-${i + 1}`,
      src: `/Generate Lama/Background/Background.png`,
      alt: `Background ${i + 1}`
    })),
    EARS: Array.from({ length: 4 }, (_, i) => ({
      id: `ears-${i + 1}`,
      src: `/Generate Lama/Ears/Ears ${i + 1}.png`,
      alt: `Ears ${i + 1}`
    })),
    EYES: Array.from({ length: 4 }, (_, i) => ({
      id: `eyes-${i + 1}`,
      src: `/Generate Lama/Eyes/Eyes ${i + 1}.png`,
      alt: `Eyes ${i + 1}`
    })),
    GLASSES: Array.from({ length: 4 }, (_, i) => ({
      id: `glasses-${i + 1}`,
      src: `/Generate Lama/Glasses/Glasses ${i + 1}.png`,
      alt: `Glasses ${i + 1}`
    })),
    HAT: Array.from({ length: 4 }, (_, i) => ({
      id: `hat-${i + 1}`,
      src: `/Generate Lama/Hat/Hat ${i + 1}.png`,
      alt: `Hat ${i + 1}`
    })),
    MOUTH: Array.from({ length: 4 }, (_, i) => ({
      id: `mouth-${i + 1}`,
      src: `/Generate Lama/Mouth/Mouth ${i + 1}.png`,
      alt: `Mouth ${i + 1}`
    })),
    NECK: Array.from({ length: 4 }, (_, i) => ({
      id: `neck-${i + 1}`,
      src: `/Generate Lama/Neck/Neck ${i + 1}.png`,
      alt: `Neck ${i + 1}`
    })),
    OUTLINE: Array.from({ length: 1 }, (_, i) => ({
      id: `outline-${i + 1}`,
      src: `/Generate Lama/Outline/Outline.png`,
      alt: `Outline ${i + 1}`
    })),
    SKIN: Array.from({ length: 1 }, (_, i) => ({
      id: `skin-${i + 1}`,
      src: `/Generate Lama/Skin/Skin.png`,
      alt: `Skin ${i + 1}`
    })),
    WOOL: Array.from({ length: 4 }, (_, i) => ({
      id: `wool-${i + 1}`,
      src: `/Generate Lama/Wool/Wool ${i + 1}.png`,
      alt: `Wool ${i + 1}`
    })),
  }

  const handleReset = () => {
    setSelectedOptions({
      background: 0,
      skin: 0,
      wool: 0,
      outline: 0,
      eyes: 0,
      neck: 0,
      hat: -1,
      glasses: -1,
      mouth: 0,
      ears: 0,
    })
  }

  const handleRandomize = () => {
    setSelectedOptions({
      background: Math.floor(Math.random() * categories.BACKGROUND.length),
      ears: Math.floor(Math.random() * categories.EARS.length),
      eyes: Math.floor(Math.random() * categories.EYES.length),
      glasses: Math.floor(Math.random() * categories.GLASSES.length),
      hat: Math.floor(Math.random() * categories.HAT.length),
      mouth: Math.floor(Math.random() * categories.MOUTH.length),
      neck: Math.floor(Math.random() * categories.NECK.length),
      outline: Math.floor(Math.random() * categories.OUTLINE.length),
      skin: Math.floor(Math.random() * categories.SKIN.length),
      wool: Math.floor(Math.random() * categories.WOOL.length),
    })
  }

  const getCompositeImage = () => {
    const selectedLayers = []
    
    selectedLayers.push(categories.BACKGROUND[0].src)
    
    selectedLayers.push(categories.SKIN[0].src)
    
    if (selectedOptions.wool >= 0) {
      selectedLayers.push(categories.WOOL[selectedOptions.wool].src)
    }
    
    selectedLayers.push(categories.OUTLINE[0].src)
    
    if (selectedOptions.eyes >= 0) {
      selectedLayers.push(categories.EYES[selectedOptions.eyes].src)
    }
    
    if (selectedOptions.neck >= 0) {
      selectedLayers.push(categories.NECK[selectedOptions.neck].src)
    }
    
    if (selectedOptions.hat >= 0) {
      selectedLayers.push(categories.HAT[selectedOptions.hat].src)
    }
    
    if (selectedOptions.glasses >= 0) {
      selectedLayers.push(categories.GLASSES[selectedOptions.glasses].src)
    }
    
    if (selectedOptions.mouth >= 0) {
      selectedLayers.push(categories.MOUTH[selectedOptions.mouth].src)
    }
    
    if (selectedOptions.ears >= 0) {
      selectedLayers.push(categories.EARS[selectedOptions.ears].src)
    }

    return selectedLayers
  }

  return (
    <div className="min-h-screen bg-[#fdf6e9] p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/Generate Lama/Outline/Outline.png"
              alt="Lama logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="text-4xl font-bold text-[#8B4513]">Lama Generator</h1>
          </div>
          <span className="text-muted-foreground">lama</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="aspect-square bg-white p-4 relative">
              {getCompositeImage().map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Layer ${index}`}
                  width={400}
                  height={400}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              ))}
            </div>
            <div className="flex gap-2 p-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleReset}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                RESET LAMA
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleRandomize}
              >
                <Shuffle className="mr-2 h-4 w-4" />
                GENERATE RANDOM
              </Button>
            </div>
            <Button className="w-full rounded-none bg-[#8B4513] hover:bg-[#704019]">
              <Download className="mr-2 h-4 w-4" />
              DOWNLOAD
            </Button>
          </Card>

          <div className="space-y-6">
            {Object.entries(categories)
              .filter(([title]) => !['SKIN', 'OUTLINE'].includes(title))
              .map(([title, options]) => (
                <CategorySelector
                  key={title}
                  title={title}
                  options={options}
                  selected={selectedOptions[title.toLowerCase()]}
                  onSelect={(index) => 
                    setSelectedOptions(prev => ({
                      ...prev,
                      [title.toLowerCase()]: index
                    }))
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
