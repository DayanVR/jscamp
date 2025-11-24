<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateTo(path) {
    navigate(path);
=======
import { useNavigate, useLocation } from 'react-router'

export function useRouter() {
  const navigate = useNavigate()
  const location = useLocation()

  function navigateTo(path) {
    navigate(path)
>>>>>>> e5376c41753983c9b100c8fe96bf51de4c5083a6
  }

  return {
    currentPath: location.pathname,
<<<<<<< HEAD
    navigateTo,
  };
}
=======
    navigateTo
  }
}
>>>>>>> e5376c41753983c9b100c8fe96bf51de4c5083a6
