import { Role } from "src/user/entities/role.entity"
import { IHistoryQuizzes } from "./history-quizzes"

export interface IUser {
    id: number
    email: string
    roleId: string|number
    role?: Role
    token?: string
    refreshToken?: string | null
    isEmailConfirmed: boolean
    avatar: string | null
    alias: string | null
    historyQuizzes: IHistoryQuizzes[]
}