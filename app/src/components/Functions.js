import axios from 'axios';
export const getDocuments = async () => {
    try {
      const response = await axios.post('http://localhost:4000/documents',  {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  // export const checkSession = async (userId) => {
  //   try {
  //     const response = await axios.post('http://localhost:4000/checkSession', {
  //       userId,
  //     }, {
  //       withCredentials: true, // Ensure credentials (cookies) are sent
  //     });
  //     console.log(response.data);
  //    // setDocuments(response.data);
  //   } catch (error) {
  //     console.error('Error fetching session:', error);
  //     // Handle error (e.g., show a message to the user)
  //   }
  // };
  
  const deleteDocument = async (id) => {
    console.warn(id);
  //   try {
  //     const response = await axios.delete(`http://localhost:4000/product/${id}`);
  //     if (response.data) {
  //       getDocuments(); // Assuming getDocuments() fetches documents after deletion
  //     }
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //     // Handle error (e.g., show a message to the user)
  //   }
  };
