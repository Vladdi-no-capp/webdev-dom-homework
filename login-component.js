export const renderLoginComponent = ({ loginPage, onLogin }) => {
    loginPage.innerHTML = `
        <div class="login-form">
            <h2>Форма входа</h2>

            <input
                class="login-input"
                type="text"
                placeholder="Логин"
            />

            <input
                class="password-input"
                type="password"
                placeholder="Пароль"
            />

            <button class="login-button">Войти</button>
        </div>
    `

    loginPage.hidden = false
    const loginInput = loginPage.querySelector('.login-input')
    const passwordInput = loginPage.querySelector('.password-input')
    const loginButton = loginPage.querySelector('.login-button')

    loginButton.addEventListener('click', () => {
        onLogin({
            login: loginInput.value.trim(),
            password: passwordInput.value,
        })
    })
}
