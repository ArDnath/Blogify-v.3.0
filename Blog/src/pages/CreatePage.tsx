
import Logout from '../components/Logout';
import { useTheme } from "../components/ThemeContext";


const CreatePage = () => {
  const {theme} = useTheme();


  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-10 ">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
  
        {/* Logout button aligned to top-right */}
        <div className="flex justify-end">
          <Logout />
        </div>
      </div>
    </div>
  );
  
};

export default CreatePage;
