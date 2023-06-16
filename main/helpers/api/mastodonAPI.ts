import type TimelineContent from '../../../main/types/TimelineContent'
import type ClientAuthContent from '../../../main/types/ClientAuthContent'
import type ClientappContent from '../../../main/types/ClientappContent'
import type RepliesDescendants from '../../../main/types/RepliesDescendants'
import type NotificationsContent from '../../../main/types/NotificationsContent'

import secureLocalStorage from "react-secure-storage"

export async function postClientApp(): Promise<ClientappContent> {
    const instance = secureLocalStorage.getItem("instance")

    const data = new URLSearchParams()
    data.append(`client_name`, `Astod`)
    data.append(`redirect_uris`, `urn:ietf:wg:oauth:2.0:oob`)
    data.append(`scopes`, `read write push`)

    const response = await fetch(`${instance}/api/v1/apps`, {
        method: 'POST',
        body: data,
    })

    return await response.json()
}

export async function postAuthToken(): Promise<ClientAuthContent> {
    const instance = secureLocalStorage.getItem("instance")
    const accessToken = secureLocalStorage.getItem("accessToken")
    const client_id = secureLocalStorage.getItem("client_id")
    const client_secret = secureLocalStorage.getItem("client_secret")

    const data = new URLSearchParams()
    data.append(`grant_type`, `authorization_code`)
    data.append(`code`, accessToken.toString())
    data.append(`client_id`, client_id.toString())
    data.append(`client_secret`, client_secret.toString())
    data.append(`redirect_uri`, `urn:ietf:wg:oauth:2.0:oob`)
    data.append(`scopes`, `read write push`)

    const response = await fetch(`${instance}/oauth/token`, {
        method: 'POST',
        body: data,
    })

  return await response.json()
}

export async function fetchTimeline(): Promise<TimelineContent[]> {
    const APIToken = secureLocalStorage.getItem("APIToken")
    const instance = secureLocalStorage.getItem("instance")

    if (!APIToken && !instance) return []

    const response = await fetch(`${instance.toString()}/api/v1/timelines/home`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${APIToken.toString()} `
        }
    })

    return await response.json()
}

export async function fetchRepliesList(parentID: string): Promise<RepliesDescendants> {
    const APIToken = secureLocalStorage.getItem("APIToken")
    const instance = secureLocalStorage.getItem("instance")

    if (!APIToken && !instance) return {descendants: []}

    const response = await fetch(`${instance.toString()}/api/v1/statuses/${parentID}/context`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${APIToken.toString()} `
        }
    })

  return await response.json()
}

export async function fetchNotificationsList(): Promise<NotificationsContent[]> {
    const APIToken = secureLocalStorage.getItem("APIToken")
    const instance = secureLocalStorage.getItem("instance")

    if (!APIToken && !instance) return []

    const response = await fetch(`${instance.toString()}/api/v1/notifications?limit=20`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${APIToken.toString()} `
        }
    })

  return await response.json()
}

export async function postStatusMessage(messageData: any): Promise<TimelineContent[]> {
    const status: string = messageData.status
    const replyID: string | undefined = messageData.replyID
    const mediaFile = messageData.mediaFile

    const APIToken = secureLocalStorage.getItem("APIToken")
    const instance = secureLocalStorage.getItem("instance")

    let params = { 
        status: status
    }

    if (replyID) {
        params = Object.assign(params, {
            in_reply_to_id: replyID
        })
    }

    if (mediaFile) {
        const data = new FormData()
        data.append(`file`, mediaFile)

        fetch(`${instance.toString()}/api/v2/media`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${APIToken.toString()} `
            },
            body: data,
        })
        .then(r => r.json())
        .then(response => {
            if (response.id) {
                let media_ids = new Array<string>(response.id)

                params = Object.assign(params, {
                    media_ids: media_ids
                })
            }

            postMessage(params)
        })

        return null
    }

    return postMessage(params)
}

async function postMessage(params: any): Promise<TimelineContent[]> {
    const APIToken = secureLocalStorage.getItem("APIToken")
    const instance = secureLocalStorage.getItem("instance")

    const response = await fetch(`${instance.toString()}/api/v1/statuses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${APIToken.toString()} `,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })

  return await response.json()
}


export async function boostStatusMessage(messageID: any): Promise<TimelineContent[]> {
    const id: string = messageID
    const instance = secureLocalStorage.getItem("instance")
    const APIToken = secureLocalStorage.getItem("APIToken")

    const response = await fetch(`${instance.toString()}/api/v1/statuses/${id}/reblog`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${APIToken.toString()} `
        }
    })

  return await response.json()
}
