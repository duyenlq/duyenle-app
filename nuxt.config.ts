// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui', [
    '@pinia/nuxt',
    {
      autoImports: [
        'defineStore',
        'storeToRefs',
        'createPinia'
      ],
    },
  ], '@nuxt/image',],

  imports: {
    dirs: [
      'composables/**',
      'stores/**',
    ]
  },

  // image: {
  //   provider: 'twicpics', // Chuyển provider thành static để không dùng IPX
  // },

  css: [
    '@/assets/css/main.css',
  ],

  ssr: false,

  runtimeConfig: {
    public: {

    }
  },

  hooks: {
    'pages:extend'(routes) {
      routes.forEach(route => {
        if (route.path.includes('/testPage')) {
          route.path = route.path.replace('/testPage', '/tien-ich')
        }
        if (route.path.includes('/caro')) {
          route.path = route.path.replace('/caro', '/co-caro')
        }
        if (route.path.includes('/gameHay')) {
          route.path = route.path.replace('/gameHay', '/game-hay')
        }
        if (route.path.includes('/gamePK')) {
          route.path = route.path.replace('/gamePK', '/game-pk')
        }
        if (route.path.includes('/testCaro')) {
          route.path = route.path.replace('/testCaro', '/co-caro-online')
        }
        if (route.path.includes('/chiTieu')) {
          route.path = route.path.replace('/chiTieu', '/chi-tieu')
        }
        if (route.path.includes('/setting')) {
          route.path = route.path.replace('/setting', '/cai-dat')
        }
        if (route.path.includes('/navMain')) {
          route.path = route.path.replace('/navMain', '/menu-trang-chu')
        }
        if (route.path.includes('/userSetting')) {
          route.path = route.path.replace('/userSetting', '/danh-sach-nguoi-dung')
        }
        if (route.path.includes('/menuSetting')) {
          route.path = route.path.replace('/menuSetting', '/menu-cai-dat')
        }
        if (route.path.includes('/login')) {
          route.path = route.path.replace('/login', '/dang-nhap')
        }
        if (route.path.includes('/profile')) {
          route.path = route.path.replace('/profile', '/thong-tin-ca-nhan')
        }
      })
    }
  },
})