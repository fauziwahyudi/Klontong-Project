import { FETCH_PRODUCTS_SUCCESS } from './actionType'
import { FETCH_CATEGORIES_SUCCESS } from './actionType'
import { DETAIL_PRODUCT_SUCCESS } from './actionType'

const BASE_URL = "http://localhost:3004"

export function fetchProducts() {
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/products", {
                method: 'GET',
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const jsonData = await response.json()

            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: jsonData })

        } catch (error) {
            console.log(error);
        }
    }
}

export function detailProduct(id) {

    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/products/" + id, {
                method: 'GET',
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })

            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const jsonData = await response.json()

            dispatch({ type: DETAIL_PRODUCT_SUCCESS, payload: jsonData })

        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchCategories() {
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/categories", {
                method: 'GET',
                headers: {

                    "access_token": localStorage.getItem("access_token")
                }
            })
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const jsonData = await response.json()

            dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: jsonData })

        } catch (error) {
            console.log(error);
        }
    }
}

export function addProduct(formProduct, handleClose) {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append('sku', formProduct.sku);
            formData.append('name', formProduct.name);
            formData.append('description', formProduct.description);
            formData.append('categoryId', formProduct.categoryId);
            formData.append('price', formProduct.price);
            formData.append('weight', formProduct.weight);
            formData.append('width', formProduct.width);
            formData.append('length', formProduct.length);
            formData.append('height', formProduct.height);
            formData.append('image', formProduct.image);

            const response = await fetch(BASE_URL + '/products', {
                method: 'POST',
                headers: {
                    "access_token": localStorage.getItem("access_token"),
                },
                body: formData,
            });

            const responseJson = await response.json();
            if (!response.ok) {
                throw new Error(responseJson.message);
            }

            dispatch(fetchProducts());
            handleClose();
            return responseJson;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}


export function editProduct(formProduct, id, handleClose) {
    return async (dispatch) => {
        try {
            const formData = new FormData();

            if (formProduct.sku) formData.append('sku', formProduct.sku);
            if (formProduct.name) formData.append('name', formProduct.name);
            if (formProduct.description) formData.append('description', formProduct.description);
            if (formProduct.categoryId) formData.append('categoryId', formProduct.categoryId);
            if (formProduct.price) formData.append('price', formProduct.price);
            if (formProduct.weight) formData.append('weight', formProduct.weight);
            if (formProduct.width) formData.append('width', formProduct.width);
            if (formProduct.length) formData.append('length', formProduct.length);
            if (formProduct.height) formData.append('height', formProduct.height);
            if (formProduct.image) formData.append('image', formProduct.image);

            const response = await fetch(BASE_URL + '/products/' + id, {
                method: 'PUT',
                headers: {
                    'access_token': localStorage.getItem('access_token'),
                },
                body: formData,
            });

            const responseJson = await response.json();
            if (!response.ok) {
                throw new Error(responseJson.message);
            }

            dispatch(fetchProducts());
            handleClose();
            return responseJson;
        } catch (error) {
            throw error;
        }
    };
}



export function destroyProduct(id) {

    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/products/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
            })

            const jsonData = await response.json()
            if (!response.ok) {
                throw new Error(jsonData.message)
            }

            dispatch(fetchProducts())

        } catch (error) {
            throw error
        }
    }
}

export function addCategory(formCategory, handleClose) {
    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(formCategory)
            })

            const responseJson = await response.json()
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            dispatch(fetchCategories())
            handleClose()
            return responseJson

        } catch (error) {
            throw error

        }
    }
}

export function editCategory(formCategory, id, handleClose) {
    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/categories/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(formCategory)
            })

            const responseJson = await response.json()
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            dispatch(fetchCategories())
            handleClose()
            return responseJson

        } catch (error) {
            throw error
        }
    }
}

export function destroyCategory(id) {

    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/categories/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
            })

            const jsonData = await response.json()
            if (!response.ok) {
                throw new Error(jsonData.message)
            }

            dispatch(fetchCategories())

        } catch (error) {
            throw error
        }
    }
}

export function registerUser(registerForm) {

    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(registerForm)
            })

            const responseJson = await response.json()

            if (!response.ok) {
                throw new Error(responseJson.message)
            }

            return responseJson

        } catch (error) {
            throw error

        }
    }
}

export function loginUser(loginForm) {

    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginForm)
            })

            const responseJson = await response.json()

            if (!response.ok) {
                throw new Error(responseJson.message)
            }

            localStorage.setItem('access_token', responseJson.access_token)

        } catch (error) {
            console.log(error);
            throw error
        }
    }
}






