import { ref } from 'vue'

export function useGallery() {
  const images = ref([
    { src: '/images/carousel/carousel-white-cocktail.jpg', cols: 6 },
    { src: '/images/carousel/test2.png', cols: 6 },
    { src: '/images/carousel/test3.png', cols: 6 },
    { src: '/images/carousel/test4.png', cols: 12 },
    { src: '/images/carousel/test5.png', cols: 4 },
    { src: '/images/carousel/test6.png', cols: 4 },
    { src: '/images/carousel/test7.png', cols: 4 },
    { src: '/images/carousel/test8.png', cols: 6 },
    { src: '/images/carousel/test9.png', cols: 6 },
    { src: '/images/carousel/test10.png', cols: 6 },
    { src: '/images/carousel/test11.png', cols: 6 },
    { src: '/images/carousel/test12.png', cols: 6 },
  ])

  return { images }
}
