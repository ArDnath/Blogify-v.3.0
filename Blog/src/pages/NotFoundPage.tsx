import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className='pt-10 flex flex-col items-center gap-10'>
            <h1>Not Found Page</h1>
            <Link to={"/"}>
            <button className='rounded-4xl p-4 border-1 bg-green-300 text-2xl text-black'>Go to Home</button>
            </Link>
        </div>
    );
}

export default NotFoundPage;
