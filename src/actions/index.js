export const getNews = () => ({
      type: 'GET_NEWS',
});
export const getAllCustomer = () => ({
    type: 'GET_CUSTOMER',
});
export const deleteCustomer = (id) => ({
    type: 'DELETE_CUSTOMER',
    id
});
export const createCustomer = (newCustomer) => ({
  type: 'CREATE_CUSTOMER',
  newCustomer
});
export const updateSuccess = (id, newUpdate) => {
    return {
      type: 'UPDATE_SUCCESS',
      id,
      newUpdate
    }
  }
  export const deleteSuccess = (id) => {
    return {
      type: 'DELETE_SUCCESS',
      id
    }
  }