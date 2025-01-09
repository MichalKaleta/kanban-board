import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const boardApi = createApi({
	reducer: "boardApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
	}),
	tagTypes: ["Items"],
	endpoints(builder) {
		return {
			getItems: builder.query({
				providesTags: ["Items"],
				query: (items) => ({
					url: "api/kanban",
				}),
			}),
			reorderItem: builder.mutation({
				invalidatesTags: ["Items"],
				query: (items) => ({
					url: "api/kanban",
					method: "POST",
					body: items,
				}),
			}),
			createItem: builder.mutation({
				invalidatesTags: ["Items"],
				query: (newItem) => ({
					url: "api/kanban",
					method: "PUT",
					body: newItem,
				}),
			}),
		};
	},
});

export { boardApi };

export const {
	useReorderItemMutation,
	useGetItemsQuery,
	useCreateItemMutation,
} = boardApi;
