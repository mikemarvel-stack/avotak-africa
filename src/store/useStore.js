import create from 'zustand'

export const useStore = create((set) => ({
  produce: [],
  setProduce: (list) => set({ produce: list }),
  user: null,
  setUser: (u) => set({ user: u })
}))
