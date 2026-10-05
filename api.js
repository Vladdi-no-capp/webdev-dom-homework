const personalKey = 'Vladislav Mordovskiy'
const commentsUrl = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`
const loginUrl = 'https://wedev-api.sky.pro/api/user/login'

export const loginUser = ({ login, password }) => {
    return fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('WRONG_LOGIN_OR_PASSWORD')
        }

        return response.json()
    })
}

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

export const postComment = ({ text, token }) => {
    return fetch(commentsUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
        }),
    })
        .then(checkResponse)
        .then(checkResponseData)
}
