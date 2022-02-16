import React, { Fragment, useState, useEffect } from 'react';
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product';
import Loader from './layout/Loader';

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { useAlert } from 'react-alert'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [system, setSystem] = useState('')
    const [rating, setRating] = useState(0)

    const systems = [
        'Nintendo NES',
        'Super Nintendo',
        'Nintendo 64',
        'Nintendo Game Cube',
        'Nintendo Wii',
        'Nintendo GameBoy',
        'Nintendo DS',
        'Nintendo Switch',
        'Playstation 1',
        'Playstation 2',
        'Playstation 3',
        'Playstation 4',
        'Playstation PSP'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword
    

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage, price, system, rating));

    }, [dispatch, alert, error, keyword, currentPage, price, system, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if (keyword || system) {
        count = filteredProductsCount
        //productsCount = filteredProductsCount
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Gaming Product Online'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                        <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Gaming Systems
                                                </h4>

                                                <ul className="pl-0">
                                                <li style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                            key=''
                                                            className="system-name"
                                                            onClick={() => setSystem('')}>
                                                            All Systems
                                                        </li>
                                                    {systems.map(category => (
                                                        
                                                        <li style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                            key={category}
                                                            className="system-name"
                                                            onClick={() => setSystem(category)}>
                                                            {category}
                                                        </li>
                                                        
                                                       
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* <hr className="my-3" /> */}

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                            key={star}
                                                            onClick={() => setRating(star)}>

                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >

                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products?.map(product => (
                                                <Product key={product._id} product={product} col={3} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                        </div>
                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={filteredProductsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item" //bootstrap class
                                linkClass="page-link" //bootstrap class
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
};

export default Home;
