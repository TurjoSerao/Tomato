import { useEffect, useState } from 'react';
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

    const url = "http://localhost:4000"
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchList = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if(response.data.success){
                setList(response.data.data)
            }
            else{
                toast.error("Error")
            }
        } catch (error) {
            toast.error("Failed to fetch list");
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (itemId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: itemId });
            if (response.data.success) {
                toast.success("Item deleted");
                fetchList();
            } else {
                toast.error("Error deleting item");
            }
        } catch (error) {
            toast.error("Failed to delete item");
        }
    }

    useEffect(()=>{
        fetchList();
    },[])



    return (
        <div className='list'>
            <div className='list-header'>
                <h1>Food Items</h1>
                <p className='list-count'>{list.length} items</p>
            </div>
            {loading ? (
                <div className='loading-container'>
                    <div className='loader'></div>
                    <p>Loading...</p>
                </div>
            ) : list.length === 0 ? (
                <div className='empty-state'>
                    <p>No items found</p>
                </div>
            ) : (
                <table className='list-table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => (
                            <tr key={item._id}>
                                <td><img src={`${url}/images/${item.image}`} alt={item.name} /></td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>${item.price}</td>
                                <td><button className='delete-btn' onClick={() => handleDelete(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default List;