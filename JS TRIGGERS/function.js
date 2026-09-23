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
