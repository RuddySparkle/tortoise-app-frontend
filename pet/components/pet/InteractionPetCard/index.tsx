'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function InteractionPetCard({ children, petId }: { children: React.ReactNode; petId: string }) {
    const [hover, setHover] = useState(false);
    const router = useRouter();
    const pathName = usePathname().split('/').length >= 2 ? usePathname().split('/')[2] : 'marketplace';

    function onMouseAction(event: React.SyntheticEvent) {
        if (event.type == 'mouseover') {
            setHover(true);
        } else {
            setHover(false);
        }
    }

    function handleClick(event: React.MouseEvent) {
        router.push(`${pathName}/${petId}`);
    }

    return (
        <div
            style={
                hover
                    ? {
                          transition: '0.2s',
                          border: '2px solid black',
                          boxShadow: '5px 4px #472F05',
                          backgroundColor: '#F79762',
                          cursor: 'pointer',
                      }
                    : {
                          transition: '0.2s',
                          border: '2px solid black',
                          boxShadow: '5px 4px #472F05',
                          backgroundColor: '#F3DDD1',
                          cursor: 'default',
                      }
            }
            onMouseOver={(event) => onMouseAction(event)}
            onMouseOut={(event) => onMouseAction(event)}
            onClick={(event) => handleClick(event)}
        >
            {children}
        </div>
    );
}
