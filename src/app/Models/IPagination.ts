import { Iproduct } from './iproduct';

export interface IPagination {
    pageIndex: number
    pageSize: number
    count: number
    data: Iproduct[]
}
