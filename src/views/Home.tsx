import { container } from '@/container'
import type { Component } from 'solid-js'

const Home: Component = () => {
  const configs = container.configs()
  const locale = container.locale()

  return (
    <div>
      <button type="button" onClick={() => configs.set('lang', 'zh-hant')}>
        Test
      </button>
      <div>{locale.getLangName('fr')}</div>
      <div>{locale.t('downloads')}</div>
    </div>
  )
}

export default Home
