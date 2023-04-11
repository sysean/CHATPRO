import { useState } from 'react';
import { Navbar, Text, Link, Button } from "@nextui-org/react";
import './navbar.css'

function MyNavbar({ onToggle }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 默认为未登录

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const [hovered, setHovered] = useState(false);

    return (
        <Navbar isCompact isBordered variant="sticky">
            <Navbar.Brand>
                <Text css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }} weight="bold">CHAT PRO</Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="#">
                    Login
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat as={Link} href="#">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}

export default MyNavbar;