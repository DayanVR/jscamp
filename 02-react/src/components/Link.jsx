<<<<<<< HEAD
import { Link as NavLink } from "react-router";

export default function Link({ href, children, ...restOfProps }) {
  return (
    <NavLink to={href} {...restOfProps}>
      {children}
    </NavLink>
  );
}
=======
import { useRouter } from "../hooks/useRouter"

export function Link ({ href, children, ...restOfProps }) {
  const { navigateTo } = useRouter()

  const handleClick = (event) => {
    event.preventDefault()
    navigateTo(href)
  }

  return (
    <a href={href} {...restOfProps} onClick={handleClick}>
      {children}
    </a>
  )
}
>>>>>>> e5376c41753983c9b100c8fe96bf51de4c5083a6
