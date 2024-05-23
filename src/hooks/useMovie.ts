"use client";
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';

const useMovie = (id: string) => {
    const newId =  id ? `/api/movies/${id}` : null;
    const { data, error, isLoading } = useSWR(
        newId,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return {
        data,
        error,
        isLoading,
    };
};

export default useMovie;
