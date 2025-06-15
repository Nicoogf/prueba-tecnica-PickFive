const STORAGE_KEY = 'top5Games' // 

export function getTopFive() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

export function addToTopFive(game) {
  const top = getTopFive()
  if (top.find((g) => g.id === game.id)) return top
  if (top.length >= 5) top.shift()
  const updated = [...top, game]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function removeFromTopFive(id) {
  const updated = getTopFive().filter(game => game.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function isInTopFive(id) {
  return getTopFive().some((g) => g.id === id)
}
