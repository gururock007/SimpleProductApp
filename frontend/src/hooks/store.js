import { create } from 'zustand'

const useProductStore = create((set) => ({
    products : [],
    setProducts : (products) => set({ products }),
    createProducts : async (newProduct) => {
        const response = await fetch("http://localhost:3000/api/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          });
    
          const data = await response.json();
          set((state) => ({products : [...state.products, data.product]}));
          return { success : data.success, message : data.message};
    },
    fetchProducts : async () => {
        const response = await fetch("http://localhost:3000/api/product", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          set({products : data.data});
    },
    deleteProducts : async (id) => {
        const response = await fetch( `http://localhost:3000/api/product/${id}`, {
            method: "DELETE",
            headers : {
                "Content-Type" : "application/json",
            },
        });
        const data = await response.json();
        set((state) => ({ products : state.products.filter(product => product._id !== id)}));
        return( { success : data.success , message : data.message } );
    },
    updateProducts : async (product) => {
        const response = await fetch( `http://localhost:3000/api/product/${product._id}`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(product),
        })

        const data = await response.json();
        set((state) => ({ 
            products : state.products.map(
                (p) => p._id === product._id ? data.data : p
            )}
        ))
        return ( {success : data.suceess, message : data.message})
    }
}));

export default useProductStore;