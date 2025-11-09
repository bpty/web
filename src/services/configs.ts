import { createMutable } from 'solid-js/store'

interface Configs {
  lang: Lang
  dev: string | null
}

const DEV_PASS = 'devpass'

export class ConfigsService {
  private configs: Configs
  private currentLangDisplay: Lang | undefined
  private langDisplay: Intl.DisplayNames | undefined

  constructor() {
    this.configs = createMutable({
      lang: 'en',
      dev: localStorage.getItem(DEV_PASS),
    })
  }

  get<K extends keyof Configs>(key: K): Configs[K] {
    return this.configs[key]
  }

  set<K extends keyof Configs>(key: K, value: Configs[K]): Configs[K] {
    const old = this.configs[key]
    this.configs[key] = value
    return old
  }
}
