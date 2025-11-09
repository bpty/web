import { ContainerBuilder } from '@/lib/ioc'
import { ModulesService } from './modules'
import { DatabaseService } from './database'
import { ConfigsService } from './configs'
import { LocaleService } from './locale'

const _containerType = new ContainerBuilder()
  .singleton('configs', ConfigsService)
  .singleton('modules', ModulesService)
  .singleton('database', DatabaseService)
  .singleton('locale', LocaleService)
  .build()

export type Container = typeof _containerType
