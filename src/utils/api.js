const API_BASE_URL = 'https://api.rawg.io/api'
const API_KEY = import.meta.env.VITE_RAWG_API_KEY

export async function fetchPopularGames(page = 1, pageSize = 12) {
  const url = `${API_BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Error al obtener juegos')
  
  const data = await response.json()
  return data.results
}
