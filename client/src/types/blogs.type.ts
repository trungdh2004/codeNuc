export interface BlogsType {
	class_name: string;
	cloudinary_video_url: null;
	id: number;
	path: string;
	public_reactions_count: number;
	readable_publish_date: string;
	reading_time: number;
	title: string;
	user_id: number;
	public_reaction_categories: PublicReactionCategory[];
	comments_count: number;
	video_duration_string: string;
	published_at_int: number;
	tag_list: string[];
	flare_tag: null;
	user: User;
}

export interface PublicReactionCategory {
	slug: string;
	name: string;
	icon: string;
	position: number;
}

export interface User {
	name: string;
	profile_image_90: string;
	username: string;
}


export interface BlogMarkDto {
	title:string;
	id:string;
	userName:string;
	path:string;
	tagList:string[]
}

export interface BookMarkType {
    tagList:   string[];
    _id:       string;
    title:     string;
    id:        string;
    path:      string;
    userName:  string;
    createBy:  string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}
