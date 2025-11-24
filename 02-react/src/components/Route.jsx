import { useRouter } from "../hooks/useRouter";

<<<<<<< HEAD
export function Route({ path, component: Component }) {
  const { currentPath } = useRouter();

  if (currentPath !== path) return null;

  return <Component />;
}
=======
export function Route ({ path, component: Component }) {
  const { currentPath } = useRouter()
  if (currentPath !== path) return null

  return <Component />
}
>>>>>>> e5376c41753983c9b100c8fe96bf51de4c5083a6
