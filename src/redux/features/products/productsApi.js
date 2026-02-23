import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/getBaseUrl'

//sudu get route er jonno builder.query hobe baki onno sob gular jonno builder.mutation hobe

 const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include'
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        // router.get('/', getAllProducts);
        fetchAllProducts: builder.query({
            query: ({category, color, minPrice, maxPrice, page=1, limit=10}) => {
                const queryParams = new URLSearchParams({
                    category : category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString()
                })
                return `/?${queryParams}`
            },
            providesTags: ["Products"]
        }),
        // router.get('/:id', getSingleProduct);
        fetchProductById: builder.query({
            query: (id)=> `/${id}`,
            providesTags: (result, error, id) => [{type: "Products", id}]
        }),
        addProduct: builder.mutation({
            query: (newProduct)=> ({
                url: "/create-product",
                method: 'POST',
                body: newProduct,
                credentials: 'include'
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/update-product/${id}`,
                method: 'PATCH',
                body: rest
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{type: "Products", id}]
        })
    })
})

export const { useFetchAllProductsQuery, useFetchProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;
export default productApi;