export default {

  searchEvent: async function (position: number[]) {
    try {
      const response = await fetch('http://localhose:3000/', { //TO UPDATE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coordinates: position
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`)
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.log('Error in searchEvent', error)
      throw error
    }
  }
}