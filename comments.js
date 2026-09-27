export let commentsFor = []
export const personalKey = 'Vladislav Mordovskiy'

export const updateComments = (newComments) => {
    commentsFor = newComments
}

export const getComments = () => {
    return fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)

            return data.comments
        })
}
