import Edit from '../assets/pen.svg'
import Delete from '../assets/trash.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import EditCategoryPage from '../views/EditCategoryPage';
import { useDispatch } from 'react-redux';
import { destroyCategory, destroyProduct } from '../store/actions/actionCreator';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function ListRowCategories(props) {

    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const dispatch = useDispatch()

    const MySwal = withReactContent(Swal)
    const handleShowDelete = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(destroyCategory(props.category.id))
                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }

    return (
        <tr>
            <td scope="row">{props.category.id}</td>
            <td className="fw-bold">{props.category.name}</td>
            <td className="fw-bold">{props.category.createdAt}</td>
            <td className="fw-bold">{props.category.updatedAt}</td>
            <td>
                <div className="list-item">
                    <Link onClick={handleShowEdit}>
                        <img src={Edit} alt="" className="icon" />
                    </Link>

                    <EditCategoryPage category={props.category} show={showEdit} handleClose={handleCloseEdit} />

                    <Link onClick={handleShowDelete} style={{ marginLeft: "20px" }}>
                        <img src={Delete} alt="" className="icon" />
                    </Link>
                </div>
            </td>
        </tr>
    )
}
