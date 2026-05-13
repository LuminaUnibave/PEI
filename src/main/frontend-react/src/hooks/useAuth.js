// PLACEHOLDER — substituir por implementação real (camada hooks).
// Contrato: { user, login(email, senha), register({nome,email,senha}), logout(), isLoading }.
export function useAuth() {
  return {
    user: null,
    isLoading: false,
    login: async () => { throw new Error('useAuth.login não implementado'); },
    register: async () => { throw new Error('useAuth.register não implementado'); },
    logout: () => {},
  };
}
