import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/getBaseUrl'

// MODIFIED: Backend controller import korar dorkar nei, tai 3 no. line muche deya hoyeche.

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include'
    }),
    tagTypes: ["Users"], // Tag types add kora holo jeno auto-refresh kaj kore
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: 'POST',
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: 'POST',
                body: credentials
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            })
        }),
        editProfile: builder.mutation({
            query: ({id, profileData}) => ({
                url: `/edit-profile/${id}`,
                method: "PATCH",
                body: profileData
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/users",
                method: 'GET'
            }),
            refetchOnMount: true,
            providesTags: ["Users"], // Eita thakle list ta refresh hobe
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"], // Delete hole list auto refresh hobe
        }),
        updateUserRole: builder.mutation({
            query: ({userId, role}) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: {role}
            }),
            invalidatesTags: ["Users"],
        })
    })
})

// Hooks gulo export kora holo
export const { 
    useRegisterUserMutation, 
    useLoginUserMutation, 
    useLogoutUserMutation, 
    useEditProfileMutation, 
    useGetAllUsersQuery, 
    useDeleteUserMutation, 
    useUpdateUserRoleMutation 
} = authApi;

export default authApi;