import type { RouterConfig } from '@nuxt/schema'

const HEADER_OFFSET = 100

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      const el = document.querySelector(to.hash)

      if (el) {
        const y =
          el.getBoundingClientRect().top +
          window.pageYOffset -
          HEADER_OFFSET

        return {
          top: y,
          behavior: 'smooth',
        }
      }
    }

    return {
      top: 0,
      behavior: 'smooth',
    }
  },
}
