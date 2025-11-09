import type { Flatten } from '@solid-primitives/i18n'
import type { langs } from '@/constants'
import type en from '@/i18n/en'

declare global {
  export type BibleModuleGlobalOptionFilter =
    | 'OSISStrongs'
    | 'OSISFootnotes'
    | 'OSISScripref'
    | 'OSISMorph'
    | 'OSISHeadings'
    | 'OSISVariants'
    | 'OSISRedLetterWords'
    | 'OSISLemma'
    | 'OSISRuby'
    | 'OSISXlit'
    | 'OSISEnum'

  export interface BibleModuleLang {
    code: string
    found: string
    given: string
    knowsDirection: boolean
    ltor: boolean
    name: string
    valid: boolean
  }

  export interface BibleModuleMetadata {
    Initials: string
    Description?: string
    GlobalOptionFilter?: BibleModuleGlobalOptionFilter[]
    Direction?: 'LtoR' | 'RtoL' | 'bidi'
    Encoding?: 'UTF-8' | 'Latin-1'
    DisplayLevel?: number
    Font?: string
    Feature?: string[]
    Abbreviation?: string
    About?: string
    LCSH?: string
    Lang?: BibleModuleLang
    Copyright?: string
    CopyrightHolder?: string
    CopyrightDate?: string
    CopyrightNotes?: string
    CopyrightContactName?: string
    CopyrightContactNotes?: string
    CopyrightContactAddress?: string
    CopyrightContactEmail?: string
    ShortPromo?: string
    ShortCopyright?: string
    DistributionLicense?: string
    DistributionNotes?: string
    TextSource?: string
  }

  export type Lang = (typeof langs)[number]
  export type LocaleRawDictionary = typeof en
  export type LocaleDictionary = Flatten<LocaleRawDictionary>
}

export {}
