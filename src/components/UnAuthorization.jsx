import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-yellow-600">403</h1>
      <p className="mt-4 text-lg">Anda tidak diizinkan mengakses halaman ini!</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default UnAuthorized;
