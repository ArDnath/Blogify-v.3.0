import Logout from "../components/Logout";
import RichEditor from "../components/RichEditor/index";
import axios from "axios";

const CreatePage = () => {
  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-10 ">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
        <RichEditor />
        {/* Logout button aligned to top-right */}
        <div className="flex justify-end">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
