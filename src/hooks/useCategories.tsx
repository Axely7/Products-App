import React, {useEffect, useState} from 'react';
import cafeApi from '../api/cafeApi';
import {Categoria, CategoriesResponse} from '../interfaces/appInterfaces';

export const useCategories = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    const {data} = await cafeApi.get<CategoriesResponse>('/categorias');
    setCategories(data.categorias);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    loading,
    categories,
  };
};
