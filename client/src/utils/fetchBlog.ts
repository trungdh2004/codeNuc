import axios from "axios";

export const queryBlog = (
	page: number = 1,
	tags: string[] = [],
	size?: number,
) => {
	const stringTags = tags.join("|");
	const per_page = size || 15;
	return axios.get(
		`https://dev.to/search/feed_content?per_page=${per_page}&page=${page}&sort_by=hotness_score&sort_direction=desc${
			stringTags ? `&tag_names%5B%5D=${stringTags}` : ""
		}&approved=&class_name=Article`,
	);
};
