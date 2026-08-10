import axios from 'axios';
import type { ResponseContainer } from './base';

export const MAIN_URL = import.meta.env.VITE_MAIN_URL;

export enum P {
	Character = '/character',
	Weapon = 'weapon',
	Spell = 'spell'
}


export async function requestGet<R>(
	url: string,
	callback?: any,
	headers?: any
) {
	axios
		.get(MAIN_URL + url, {
			withCredentials: true,
			headers: headers,
		})
		.then((response) => {
			callback(response.data as ResponseContainer<R>);
		})
		.catch(function (error) {
			callback({ status: 'error', message: error } as ResponseContainer<R>);
		});
}

export async function requestPost<R>(
	url: string,
	inData: any,
	callback?: any,
	headers?: any
) {
	axios
		.post(MAIN_URL + url, inData, { withCredentials: true, headers: headers })
		.then((response) => {
			callback(response.data as ResponseContainer<R>);
		})
		.catch(function (error) {
			callback({ status: 'error', message: error } as ResponseContainer<R>);
		});
}

export async function requestPostForm<R>(
	url: string,
	inData: any,
	callback?: any
) {
	axios
		.post(MAIN_URL + url, inData, {
			withCredentials: true,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		.then(function (response) {
			callback(response.data as ResponseContainer<any>);
		})
		.catch(function (response) {
			console.error(response);
		});
}

export async function requestPut<R>(
	url: string,
	inData: any,
	callback?: any,
	headers?: any
) {
	axios
		.put(MAIN_URL + url, inData, { withCredentials: true, headers: headers })
		.then((response) => {
			callback(response.data as ResponseContainer<R>);
		})
		.catch(function (error) {
			callback({ status: 'error', message: error } as ResponseContainer<R>);
		});
}

export async function requestDelete<R>(url: string, callback?: any) {
	axios
		.delete(MAIN_URL + url, { withCredentials: true })
		.then((response) => {
			callback(response.data as ResponseContainer<R>);
		})
		.catch(function (error) {
			callback({ status: 'error', message: error } as ResponseContainer<R>);
		});
}