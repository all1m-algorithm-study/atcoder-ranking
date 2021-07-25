/*
    Database Document Templates
*/
export interface IEvent {
    startTime: Date,
    endTime: Date
}

export interface IContestHistory {
    date: Date,
    title: string,
    rank: number,
    performance: number,
    newRating: number,
    diff: string
}

export interface IParticipant {
    handle: string,
    nickname: string,
    name: string,
    history: IContestHistory[]
}

/*
    API Interfaces
*/
export interface ILoginRequest {
    password: string
}

export interface ITokenData {
    authDate: Date
}

export interface IParticipantsGetResponse {
    participants: IParticipant[]
}

export interface IParticipantsPostRequest {
    participants: IParticipant[]
}