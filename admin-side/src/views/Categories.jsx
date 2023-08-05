// import { useFetch } from '../hooks/useFetch'
import ListRowCategories from '../components/ListRowCategories'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../store/actions/actionCreator';
import AddCategoryPage from './AddCategoryPage';

export default function Categories() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [loading, setLoading] = useState(true)

    const categories = useSelector((state) => state.categoryReducer.categories)
    const dispatch = useDispatch()
    console.log(categories);

    useEffect(() => {
        dispatch(fetchCategories())
            .then(() => {
                setLoading(false)
            })
    }, [])

    return (
        <>
            {/* Category Section */}
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-2" style={{marginRight: "100px", marginTop: "50px"}} id="category-section">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2" style={{ fontSize: "30px" }}>Categories List</h1>
                    <Button variant="secondary" onClick={handleShow}>
                        + Create Category
                    </Button>

                    <AddCategoryPage show={show} handleClose={handleClose} />
                    
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">CREATED AT</th>
                                    <th scope="col">UPDATED AT</th>
                                    <th scope="col" width="50px">ACTION</th>
                                </tr>
                            </thead>
                            <tbody id="table-category">{
                                loading ?
                                    <tr>
                                        <td colSpan={5}>loading...</td>
                                    </tr> :
                                categories.map((el) => {
                                    return (
                                        <ListRowCategories
                                            key={el.id}
                                            category={el}
                                        />
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {/* End Category Section */}
        </>
    )
}