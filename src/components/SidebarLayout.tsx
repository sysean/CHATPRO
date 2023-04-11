import './sidebar-layout.css'
import React, { useState } from "react";

// 菜单项定义
interface MenuItem {
    id: string;
    icon: JSX.Element;
    text: string;
    content: JSX.Element;
}

export interface SidebarGroup {
    groupName: string;
    items: MenuItem[];
}

interface SidebarLayoutProps {
    groups: SidebarGroup[];
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ groups }) => {
    const [activeContent, setActiveContent] = useState<JSX.Element | null>(null);

    const handleMenuItemClick = (content: JSX.Element) => {
        setActiveContent(content);
    };

    return (
        <div className="container">
            <div className="sidebar">
                {groups.map((group, index) => (
                    <div key={index} className="sidebar-group">
                        <h3>{group.groupName}</h3>
                        {group.items.map((item) => (
                            <div
                                key={item.id}
                                className="sidebar-item"
                                onClick={() => handleMenuItemClick(item.content)}
                            >
                                <span className="sidebar-icon">{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="content">{activeContent}</div>
        </div>
    );
};

export default SidebarLayout
