/** The simplest IoC container you have ever seen */

const singletonInstances: Record<string, any> = Object.create(null)
const container: Record<string, any> = Object.create(null)

type Cls = new (...args: any[]) => any
type SingCls = new () => any
type Func = (...args: any[]) => any
type SingFunc = () => any

type ToBuilder<U extends Cls | Func> = U extends new (...args: infer T) => infer R ? (...args: T) => R : unknown

type Reserved<K, T> = K & (K extends keyof T ? never : unknown)

export class ContainerBuilder<T = unknown> {
  transient<K extends string, U extends Cls>(
    key: Reserved<K, T>,
    cls: U,
  ): ContainerBuilder<T & { [k in K]: ToBuilder<U> }> {
    container[key] = (...args: any) => new cls(...args)
    return this as any
  }

  singleton<K extends string, U extends SingCls>(
    key: Reserved<K, T>,
    cls: U,
  ): ContainerBuilder<T & { [k in K]: ToBuilder<U> }> {
    container[key] = () => {
      if (key in singletonInstances) return singletonInstances[key]
      const v = new cls()
      singletonInstances[key] = v
      return v
    }
    return this as any
  }

  factory<K extends string, U extends Func>(key: Reserved<K, T>, func: U): ContainerBuilder<T & { [k in K]: U }> {
    container[key] = func
    return this as any
  }

  once<K extends string, U extends SingFunc>(key: Reserved<K, T>, func: U): ContainerBuilder<T & { [k in K]: U }> {
    container[key] = () => {
      if (key in singletonInstances) return singletonInstances[key]
      const v = func()
      singletonInstances[key] = v
      return v
    }
    return this as any
  }

  build(): T {
    return undefined as any
  }
}

export function getContainer(): any {
  return container
}
