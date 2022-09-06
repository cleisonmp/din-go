import create from 'zustand'

interface SidebarDrawerProps {
  isOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
}

export const useSidebarDrawer = create<SidebarDrawerProps>()((set) => ({
  isOpen: false,
  openSidebar: () => set(() => ({ isOpen: true })),
  closeSidebar: () => set(() => ({ isOpen: false })),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}))
