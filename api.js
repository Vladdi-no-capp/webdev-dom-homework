const personalKey = 'Vladislav Mordovskiy'
const commentsUrl = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`

const parseResponse = (response) => {
    return response.json().then((data) => {
        if (!response.ok || data.error) {
            throw new Error(data.error || `Ошибка HTTP: ${response.status}`)
        }

        return data
    })
}

export const getComments = () => {
    return fetch(commentsUrl).then(parseResponse)
}

export const postComment = (newComment) => {
    return fetch(commentsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
    }).then(parseResponse)
}
