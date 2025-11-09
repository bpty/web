import * as i18n from '@solid-primitives/i18n'
import { createResource, type ResourceReturn } from 'solid-js'
import { langs } from '@/constants'
import { container } from '@/container'

export class LocaleService {
  private configs = container.configs()
  private currentLangDisplay: Lang | undefined
  private langDisplay: Intl.DisplayNames | undefined
  private dict: ResourceReturn<LocaleDictionary> | undefined
  private translator: i18n.Translator<LocaleDictionary, string> | undefined

  getLanguages(): readonly Lang[] {
    return langs
  }

  getLangName(code: string): string {
    const lang = this.configs.get('lang')
    if (this.currentLangDisplay !== lang) {
      this.langDisplay = new Intl.DisplayNames([lang], { type: 'language' })
    }
    return this.langDisplay!.of(code) || code
  }

  async fetchDictionary(lang: Lang): Promise<LocaleDictionary> {
    const dict = await import(`../i18n/${lang}.ts`)
    return i18n.flatten(dict.default as LocaleRawDictionary)
  }

  loadTranslator() {
    if (!this.translator) {
      if (!this.dict) {
        this.dict = createResource(() => this.configs.get('lang'), this.fetchDictionary.bind(this))
      }
      this.translator = i18n.translator(this.dict![0], i18n.resolveTemplate) as any
    }
    return this.translator!
  }

  get t() {
    return this.translator!
  }

  isLocaleDictionaryLoaded(): boolean {
    return !!this.dict?.[0]()
  }
}
