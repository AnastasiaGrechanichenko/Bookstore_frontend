import React from 'react'
import { useState,useEffect } from 'react'
import './CatalogFilters.css'

const CATEGORIES = [
    {value:'all', label:'Все категории'},
    {value:'novelty', label:'Новинки 2026'},
    {value:'manga', label:'Аниме и манга'},
    {value:'educational', label:'Учебная литература'},  
    { value: 'poetry', label: 'Поэзия' },
    { value: 'detective', label: 'Детективы' },
    { value: 'sci-fi', label: 'Фантастика' },
    { value: 'bestseller', label: 'Бестселлеры' }
];


export default function CatalogFilters({onFilterChange, initialSearch = '',initialCategory='all'}) {
    const [category,setCategory] = useState('initialCategory')
    const [minPrice,setMinPrice] = useState('')
    const [maxPrice,setMaxPrice] = useState('')
    const [search, setSearch] = useState(initialSearch)

    useEffect(() => {
        setSearch(initialSearch);
    },[initialSearch]);

    useEffect(()=> {
        onFilterChange({category,minPrice,maxPrice,search});
    }, [category,minPrice,maxPrice,search,onFilterChange]);

    useEffect(()=> {
        setCategory(initialCategory)
    },[initialCategory]);

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const resetFilters = () => {
        setCategory('all');
        setMinPrice('');
        setMaxPrice('');
        setSearch('');
    }


  return (
        <div className='catalog-filters'>
            <h2 className='filters-title'>Фильтры</h2>
            <div className='filters-block'>
                <label htmlFor='search-input'>Поиск</label>
                <input
                    id='search-input'
                    type='text'
                    value={search}
                    onChange={handleSearchChange}
                    placeholder='Название/Автор книги'
                    className='filter-input'
                />
            </div>
            <div className='filters-block'>
                <label>Категории</label>
                <div className='category-list'>
                    {CATEGORIES.map(cat => (
                        <label key={cat.value} className='category-option'>
                            <input
                                type='radio'
                                name='category'
                                value={cat.value}
                                checked={category ===cat.value}
                                onChange={()=>handleCategoryChange(cat.value)}
                            />
                            <span>{cat.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className='filters-block'>
                <label>Цена</label>
                <div className='price-inputs'>
                    <input
                    type='number'
                    placeholder='от'
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className='price-input'
                    min='0'
                    />
                    <span className='price-separator'>-</span>
                    <input 
                        type='number'
                        placeholder='до'
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className='price-input'
                        min = '0'
                    />
                </div>
            </div>
            <button className='reset-filters-btn' onClick={resetFilters}>
                Сбросить фильтры
            </button>  
            </div>
  );
}
