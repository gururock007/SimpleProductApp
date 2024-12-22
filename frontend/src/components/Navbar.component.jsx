import { Navbar, NavbarBrand,NavbarContent, NavbarItem, Button } from "@nextui-org/react"
import { Link, useLocation } from "react-router-dom"

const NavbarComponent = () => {
  const location = useLocation();
  return (
    <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive = {location.pathname == "/"}>
            <Link color="foreground" to={"/"}>
              All Product
            </Link>
          </NavbarItem>
          <NavbarItem isActive = {location.pathname == "/create-product"}>
            <Link aria-current="page" to={"/create-product"}>
              Create Product
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to={"/edit"}>
              Edit Product
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
  )
}

export default NavbarComponent
