import { useUser } from "../../hooks/useUser";

const Loading = () => {
  const { loading } = useUser();

  if (!loading) return null;

  return (
    <div className="fixed h-screen w-screen inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default Loading;
