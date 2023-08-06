import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/actions/actionCreator';
import AddCategoryPage from './AddCategoryPage';
import styled from 'styled-components';
import ListRowCategories from '../components/ListRowCategories';

export default function Categories() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [loading, setLoading] = useState(true);
    const categories = useSelector((state) => state.categoryReducer.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories()).then(() => {
            setLoading(false);
        });
    }, [dispatch]);

    return (
        <>
            {/* Category Section */}
            <Section className="col-md-9 ms-sm-auto col-lg-10 px-md-2">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2" style={{ fontSize: '30px' }}>
                        Categories List
                    </h1>
                    <CustomButton variant="secondary" onClick={handleShow}>
                        + Create Category
                    </CustomButton>

                    <AddCategoryPage show={show} handleClose={handleClose} />
                </div>
                <div className="row">
                    <div className="col-12">
                        <Table>
                            <thead>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">CREATED AT</th>
                                    <th scope="col">UPDATED AT</th>
                                    <th scope="col" width="50px">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="table-category">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5}>loading...</td>
                                    </tr>
                                ) : (
                                    categories.map((el) => {
                                        return <ListRowCategories key={el.id} category={el} />;
                                    })
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Section>
            {/* End Category Section */}
        </>
    );
}

const Section = styled.section`
    margin-right: 100px;
    margin-top: 50px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 10px;
        border: 1px solid #333366;
        text-align: center;
    }

    th {
        background-color: #333366;
        color: white;
    }
`;

const CustomButton = styled(Button)`
    background-color: #333366;
    color: white;
    border: none;
    &:hover {
        background-color: #dfdf36;
        color: #000;
    }
`;
