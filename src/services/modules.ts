import JSZip from 'jszip'
import { groupBy, mapObject, pipe, sortObject } from 'rambda'
import { container } from '@/container'

const REPOSITORY_BASE = 'repository'

export class ModulesService {
  private readonly database = container.database()

  private getRepoList(dev: string | null): string[] {
    if (!dev || dev === REPOSITORY_BASE) return [REPOSITORY_BASE]
    return [REPOSITORY_BASE, dev]
  }

  private async validateList(list: string[]): Promise<string[]> {
    const output = await Promise.all(list.map((repo) => fetch(`/${repo}/alive.txt`).then((x) => (x.ok ? repo : ''))))
    return output.filter((x) => x)
  }

  private async loadBibleModules(list: string[]): Promise<BibleModuleMetadata[]> {
    const output = await Promise.all(
      list.map(async (repo): Promise<BibleModuleMetadata[]> => {
        const resp = await fetch(`/${repo}/bible/_repo.zip`)
        if (!resp.ok) return []
        const buf = await resp.arrayBuffer()
        const zip = await JSZip.loadAsync(buf)
        const file = zip.file('repo.json')
        if (!file) return []
        const content = await file.async('string')
        if (!content) return []
        return JSON.parse(content)
      }),
    )
    return output.flat()
  }

  private sortBibleModules(modules: BibleModuleMetadata[]): BibleModuleMetadata[][] {
    const result = pipe(
      modules,
      groupBy((mod) => (mod.Lang?.valid ? mod.Lang.found : '')),
      mapObject((mods) => mods!.sort((a, b) => a.Initials.localeCompare(b.Initials))),
      sortObject((a, b) => a.localeCompare(b)),
    )
    return Object.values(result)
  }

  async getBibleModules(dev: string | null): Promise<BibleModuleMetadata[][]> {
    const list = this.getRepoList(dev)
    const filtered = await this.validateList(list)
    const modules = await this.loadBibleModules(filtered)
    return this.sortBibleModules(modules)
  }
}
