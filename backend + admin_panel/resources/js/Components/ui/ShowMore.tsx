import React from "react";
import { ReadMoreWeb } from "react-shorten";

const ShowMore: React.FC<{
    truncate?: number;
    children: React.ReactNode;
}> = ({ truncate = 30, children }) => {
    return (
        <ReadMoreWeb
            truncate={truncate}
            showLessText="Montre moins"
            showMoreText="Montre plus"
            className="text-blue-600"
        >
            {children}
        </ReadMoreWeb>
    );
};
export { ShowMore };
