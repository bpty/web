import { Route, Router } from '@solidjs/router'
import { Show, type Component } from 'solid-js'
import Home from './views/Home'
import { container } from './container'

const App: Component = () => {
  const locale = container.locale()
  locale.loadTranslator()

  return (
    <Show when={locale.isLocaleDictionaryLoaded()}>
      <Router base={import.meta.env.BASE_URL}>
        <Route path="/" component={Home} />
      </Router>
    </Show>
  )
}

export default App
