import { atom, useAtom } from 'jotai'

// create typedef this is null or {"dob": null, "email": "xvnyan@gmail.com", "gender": null, "helpful": 0, "id": 1, "image": "https://lh3.googleusercontent.com/a/AGNmyxa9f7amIsKzXc4FXr2NkMnjQoKB0Pi4fj7OZFTN=s96-c", "name": "Gilang Ramadhan", "role": "user"}
/**
 * @typedef {null | {
 * dob: null | string,
 * email: string,
 * gender: null | string,
 * helpful: number,
 * id: number,
 * image: string,
 * name: string,
 * role: string,
 * }} User
 *
 */

/**
 * @type {import('jotai').Atom<User | null>}
 */
const userAtom = atom(null)

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom)
  return { user, setUser }
}
