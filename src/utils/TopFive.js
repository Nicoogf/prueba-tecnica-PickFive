const STORAGE_KEY = 'TopFiveGames'

export function getTopFive() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

export function addToTopFive(game) {
  const top = getTopFive()
  const exists = top.find((item) => item.id === game.id)
  if (exists) return top 
  
  if (top.length >= 5) {
    top.shift() // 
  }

  const updated = [...top, game]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
