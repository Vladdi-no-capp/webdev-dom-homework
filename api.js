const personalKey = 'Vladislav Mordovskiy'
const commentsUrl = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`

const checkResponse = (response) => {
    if (response.status === 500) {
        throw new Error('SERVER_ERROR')
    }

    if (response.status === 400) {
        throw new Error('VALIDATION_ERROR')
    }

    return response.json()
}

const checkResponseData = (data) => {
    if (data.error) {
        throw new Error(data.error)
    }

    return data
}

export const getComments = () => {
    return fetch(commentsUrl)
        .then(checkResponse)
        .then(checkResponseData)
        .then((data) => data.comments)
}

export const postComment = (newComment) => {
    return fetch(commentsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
    })
        .then(checkResponse)
        .then(checkResponseData)
}
