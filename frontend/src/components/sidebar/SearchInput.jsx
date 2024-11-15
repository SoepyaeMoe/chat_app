import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { useConversation } from "../../store/conversation/useConversation";
import useGetConvresation from '../../hooks/useGetConversation';

const SearchInput = () => {
    const [search, setSearch] = useState('');
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConvresation();
    const handelSubmmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error(`Search term must be at least 3 characters`);
        }

        const conversation = conversations.find(conversation => conversation.fullName.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else {
            toast.error('No conversation found.');
        }
    }
    return (
        <form onSubmit={handelSubmmit} className='flex items-center gap-2'>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                type='text'
                placeholder='Search…'
                className='input input-bordered rounded-full' />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
        </form>
    );
};
export default SearchInput;