const storage = localStorage.getItem('auth')

// eslint-disable-next-line import/no-mutable-exports
let token = false
if (storage) {
  const getToken = JSON.parse(storage).token
  if (getToken)
    token = getToken
}

export default token
