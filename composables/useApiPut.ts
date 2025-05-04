// import Cookies from 'js-cookie';
import type { NitroFetchRequest } from 'nitropack';

export const useApiPut = async <T>(request: NitroFetchRequest, opts: object) => {
  const config = useRuntimeConfig();
  const token = useCookie('token')
  return await $fetch<T>(request, {
    method: 'PUT',
    baseURL: `${config.public.apiURL}`,
    body: opts,
    headers: {
      authorization: token.value ? `Bearer ${token.value}` : `Bearer ${config.public.storeToken}`
    },
  });
};
