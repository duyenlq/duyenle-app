// import Cookies from 'js-cookie';

export const useApiDelete = <T>(request: string) => {
  const config = useRuntimeConfig();
  const token = useCookie('token')
  return $fetch<T>(request, {
    method: 'DELETE',
    baseURL: `${config.public.apiURL}`,
    headers: {
      authorization: token.value ? `Bearer ${token.value}` : `Bearer ${config.public.storeToken}`
    },
  });
};
