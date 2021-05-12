import axios from 'axios'
// npx json-server ./data.json --port 4000 서버 생성 명렁어

export const getPosts = async () => {
  const response = await axios.get('/posts')
  return response.data
}

export const getPostById = async (id) => {
  const response = await axios.get(`/posts/${id}`)
  return response.data
}
