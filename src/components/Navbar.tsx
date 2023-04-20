import { useState } from 'react';
import { Navbar, Text, Link, Button, Dropdown } from "@nextui-org/react";
import './navbar.css'
import { icons } from "./icons/Icons"

function MyNavbar({ onMenuChange }) {
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
            <Navbar.Brand css={{ alignItems: "center" }}>
                {/* <Logo /> */}
                <Text css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }} weight="bold">CHAT PRO</Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Dropdown isBordered>
                    <Navbar.Item>
                        <Dropdown.Button
                            auto
                            light
                            css={{
                                px: 0,
                                dflex: "center",
                                svg: { pe: "none" },
                            }}
                            iconRight={icons.chevron}
                            ripple={false}
                        >
                            Features
                        </Dropdown.Button>
                    </Navbar.Item>
                    <Dropdown.Menu
                        aria-label="ACME features"
                        css={{
                            $$dropdownMenuWidth: "340px",
                            $$dropdownItemHeight: "70px",
                            "& .nextui-dropdown-item": {
                                py: "$4",
                                // dropdown item left icon
                                svg: {
                                    color: "$secondary",
                                    mr: "$4",
                                },
                                // dropdown item title
                                "& .nextui-dropdown-item-content": {
                                    w: "100%",
                                    fontWeight: "$semibold",
                                },
                            },
                        }}
                        onAction={(key) => {
                            onMenuChange(key);
                        }}
                    >
                        <Dropdown.Item
                            key="ai_chat"
                            title="AI Text"
                            showFullDescription
                            description="AI question support"
                            icon={icons.server}
                        >
                            +99% Uptime
                        </Dropdown.Item>
                        <Dropdown.Item
                            key="ai_image"
                            title="AI Image"
                            showFullDescription
                            description="AI image support"
                            icon={icons.activity}
                        >
                            Usage Metrics
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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