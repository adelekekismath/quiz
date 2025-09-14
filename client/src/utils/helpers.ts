const decodeHtmlEntities = (text: string) => {
    return text.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
}

import router from "@/router";

const fetchUserData = async (api: any, auth: any) => {
    try {
        const response = await api.get('auth/me');
        auth.login(response.data);
    } catch (error) {
        console.error('Failed to fetch user data:', error);

        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          (error as any).response?.status === 401
        ) {
          localStorage.removeItem('token')
          auth.logout()
          router.push('/login')
        }
    }
}


export { decodeHtmlEntities, fetchUserData };