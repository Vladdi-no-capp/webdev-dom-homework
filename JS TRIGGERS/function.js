const sanitizeHtml = (value) => {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')
}

const getCurrentDate = () => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = String(now.getFullYear()).slice(-2)
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

const formatCommentDate = (value) => {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return ''
    }

    return date
        .toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
        .replace(',', '')
}

export const renderComments = (commentsElement, commentsData) => {
    commentsElement.innerHTML = commentsData
        .map((comment) => {
            const safeName = sanitizeHtml(String(comment.author?.name ?? ''))
            const safeText = sanitizeHtml(String(comment.text ?? ''))
            const formattedDate = formatCommentDate(comment.date)
            const likes = Number(comment.likes) || 0
            const activeLikeClass = comment.isLiked ? ' -active-like' : ''

            return `
                <li class="comment">
                    <div class="comment-header">
                        <div class="comment-author">${safeName}</div>
                        <div>${formattedDate}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">${safeText}</div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${likes}</span>
                            <button class="like-button${activeLikeClass}"></button>
                        </div>
                    </div>
                </li>
            `
        })
        .join('')
}

export const addComment = (comments, placeholderName, placeholderText) => {
    const name = placeholderName.value.trim()
    const text = placeholderText.value.trim()

    if (name === '' || text === '') {
        return
    }

    const safeName = sanitizeHtml(name)
    const safeText = sanitizeHtml(text)
    const formattedDate = getCurrentDate()

    comments.insertAdjacentHTML(
        'beforeend',
        `
            <li class="comment">
                <div class="comment-header">
                    <div class="comment-author">${safeName}</div>
                    <div>${formattedDate}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${safeText}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">0</span>
                        <button class="like-button"></button>
                    </div>
                </div>
            </li>
        `,
    )

    placeholderName.value = ''
    placeholderText.value = ''
}
