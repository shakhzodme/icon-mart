import * as Iconsax from 'iconsax-react'
import { Icon, Variant } from "./Picker"
import { splitByCaptial } from "./utils"

export const variants: Variant[] = [
  { key: "Linear" },
  { key: "Outline" },
  { key: "Bold" },
  { key: "Bulk" },
  { key: "Broken" },
  { key: "TwoTone" },
]

export const icons: Icon[] = Object.keys(Iconsax)
  .filter((key) => ![
    "Icon",
    "IconProps"
  ].includes(key))
  .map((key) => ({
    key,
    name: splitByCaptial(key).join(" "),
    keywords: splitByCaptial(key),
    icon: ({ variant }) => {
      const Icon = (Iconsax as Record<string, Iconsax.Icon>)[key]
      return <Icon variant={variant?.key as unknown as Iconsax.IconProps["variant"]} />
    },
  }))