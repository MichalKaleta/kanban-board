import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const boardApi = createApi({
	reducer: "boardApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
	}),
	endpoints(builder) {
		return {
			reorderItem: builder.mutation({
				query: (items) => ({
					url: "api/kanban",
					method: "POST",
					body: items,
				}),
			}),
		};
	},
});

export { boardApi };

export const { useReorderItemMutation } = boardApi;
