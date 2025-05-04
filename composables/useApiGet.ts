// import Cookies from 'js-cookie';

export const useApiGet = <T>(request: any, opts: any = { }) => {
  const token = useCookie('token')
  const config = useRuntimeConfig();
  return $fetch<T>(request, {
    baseURL: `${config.public.apiURL}`,
    query: opts,
    headers: {
      authorization: token.value ? `Bearer ${token.value}` : `Bearer ${config.public.storeToken}`
    },
  });
  
}
