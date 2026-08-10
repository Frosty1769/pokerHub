export interface Pagination {
	page: number;
	size: number;
}

export interface Sort {
	order_by?: string;
	order_dir?: 'asc' | 'desc';
}

export interface Filter<F, S> {
	sort_by?: Sort;
	filter_by?: F;
	search_by?: S;
	pagination: Pagination;
}

export interface ResponseContainer<T> {
	status: 'ok' | 'error';
	message?: string;
	code?: number;
	data?: T;
}

export interface Status {
	status: 'ok' | 'error';
}
