import React from 'react'
import { css } from '@emotion/react'
import Fuse from 'fuse.js'

export type Icon = {
  key: string,
  name: string,
  keywords: string[],
  icon: React.FC<{
    variant?: Variant
  }>
}

export type Variant = {
  key: string
};

export type SelectedIcon = {
  key: string;
  variant: string;
}

const Picker: React.FC<{
  icons: Icon[]
  iconPerRow?: number;
  value?: SelectedIcon;
  setValue?: (value: SelectedIcon) => void;
  variants?: Variant[]
}> = ({ icons: iconsRaw, iconPerRow = 10, value, setValue, variants = [] }) => {
  const [fuse, setFuseInstance] = React.useState<Fuse<Icon> | undefined>()
  const [icons, setIcons] = React.useState<Icon[]>([])
  const [hoveredIcon, setHoveredIcon] = React.useState<Icon | undefined>()
  const [variant, setVariant] = React.useState<Variant>(variants[0])
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    setFuseInstance(new Fuse(iconsRaw, {
      keys: [
        'keywords',
      ]
    }))
    setIcons(iconsRaw)
  }, [iconsRaw])

  React.useEffect(() => {
    if (fuse && search.length > 0) {
      setIcons(fuse.search(search).map(r => r.item))
    } else {
      setIcons(iconsRaw)
    }
  }, [iconsRaw, fuse, search])

  return <div
    css={css`
      width: 338px;
      font-family: sans-serif;
      border-radius: 4px;
      border: 1px solid #ddd;
    `}
  >
    <div css={css`padding: 8px; border-bottom: 1px solid #ddd;`}>
      <input
        css={css`
          width: calc(100% - 8px);
          padding: 2px 2px;
          border-radius: 4px solid #ddd;
        `}
        placeholder="Search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div css={css`padding: 8px; border-bottom: 1px solid #ddd;`}>
      {variants.map((v) => (
        <button
          css={css`
            background-color: #eee;
            border: 1px solid #bbb;
            border-radius: 4px;
            margin-right: 2px;

            &[data-selected=true] {
              background-color: #ddd;
            }
          `}
          key={v.key}
          data-selected={variant?.key == v.key}
          onClick={() => {
            setVariant(v)
          }}
        >{v.key}</button>
      ))}
    </div>
    <div css={css`
      height: 270px;
      overflow-y: auto;
      display: grid;
      grid-auto-rows: 32px;
      grid-template-columns: repeat(${iconPerRow}, auto);
      border-bottom: 1px solid #ddd;
      padding: 0 8px;
    `}>
      {icons.map((icon) => {
        const Icon = icon.icon
        return <div
          key={icon.key}
          css={css`
            display: flex;
            height: 32px;
            width: 32px;
            justify-content: center;
            align-items: center;
            margin: auto;

            &:hover {
              background-color: #eee;
            }

            &[data-selected=true] {
              background-color: #bbb;
            }
          `}
          data-selected={value?.key == icon.key && value?.variant == variant?.key}
          onMouseEnter={() => setHoveredIcon(icon)}
          onMouseLeave={() => setHoveredIcon(undefined)}
          onClick={(e) => {
            e.preventDefault()
            setValue?.({
              key: icon.key,
              variant: variant?.key ?? variants[0]?.key
            })
          }}
        >
          <Icon key={icon.key} variant={variant} />
        </div>
      })}
    </div>

    <div css={css`
      height: 36px;
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 16px;
    `}>
      {hoveredIcon && <>
        <div css={css`height: 32px; width: 32px; display: flex; justify-content: center; align-items: center;`}>
          {(() => {
            const Icon = hoveredIcon.icon

            return <Icon variant={variant} />
          })()}
        </div>
        <div css={css`display: flex; flex-direction: column; justify-content: center;`}>
          <span>{hoveredIcon.name}</span>
          <span css={css`font-size: 14px; color: #999;`}>{hoveredIcon.key}</span>
        </div>
      </>}
      {!hoveredIcon && <>
        <span css={css`font-size: 32px;`}>🏬</span>
        <span css={css`
          font-size: 24px;
          color: #888;
        `}>
          Icon Mart
        </span>
      </>}
    </div>
  </div>
}

export default Picker