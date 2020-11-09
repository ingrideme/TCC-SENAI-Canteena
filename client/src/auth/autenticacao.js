// Configuração de autenticação de usuários
const STORAGE_KEY = "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva"

export const isAuthenticated = () => !!localStorage.getItem(STORAGE_KEY)
export const login = (token) => localStorage.setItem(STORAGE_KEY, token)
export const logout = (token) => localStorage.removeItem(STORAGE_KEY, token)
export { STORAGE_KEY }