import { usePathSelector } from 'redux-utility';

export const usePlayer = () => usePathSelector("player",{})
export const usePlayerError = () => usePathSelector("player.nameValidation",{})
export const useRooms = () => usePathSelector("rooms",[])
export const useRouting = () => usePathSelector("routing.view","")