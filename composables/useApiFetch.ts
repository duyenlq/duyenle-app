// import Cookies from 'js-cookie';

export const useApiFetch = <T>(request: any, opts: object = ref({})) => {
  const config = useRuntimeConfig();
  const token = useCookie('token')
  return useFetch<T>(() => request, {
    baseURL: `${config.public.apiURL}`,
    query: opts,
    headers: {
      authorization: token.value ? `Bearer ${token.value}` : `Bearer ${config.public.storeToken}`
    },
  })
}
