export function getAdminDb() {
  return {
    collection: (name: string) => ({
      add: async (data: any) => ({ id: 'mock-id' }),
      doc: (id: string) => ({
        set: async (data: any) => ({}),
        get: async () => ({ exists: false, data: () => ({}) })
      })
    })
  };
}
