import { ReactNode } from 'react';

export enum Pathnames {
  index = '/',
  release = '/release',
  id = ':id',
}

export interface Release {
  id: number;
  title: string;
  cover_image: string;
  year: string;
  style: string[];
  genre: string[];
}

export interface PaginationData {
  page: number;
  per_page: number;
  pages: number;
  items: number;
}

export type ReleasesResponse = {
  results: Release[];
  pagination: PaginationData;
};

export type ChildrenProps = {
  children?: ReactNode;
};

export interface ErrorBoundaryState {
  hasError: boolean;
}
