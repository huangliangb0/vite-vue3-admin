import { CreateAppFunction } from 'vue'

declare global {
  /* App 实例 */
  type AppInstance = ReturnType<CreateAppFunction<Element>>

  
}
