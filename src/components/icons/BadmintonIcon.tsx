import React from 'react';
import { LucideProps } from 'lucide-react';

/**
 * Custom Badminton Icon - Racket + Shuttlecock
 * Designed to match Muhammadiyah Games sport icon style
 * Bold outline, modern flat design, consistent with other icons
 * 
 * Design Specifications:
 * - Bold stroke width: 2-2.5px for main elements
 * - Proper padding and centering
 * - Matches Lucide icon style (24x24 viewBox)
 * - Uses Muhammadiyah green when rendered
 */
export function BadmintonIcon(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Racket Handle - Bold and clear */}
      <line x1="2.5" y1="21.5" x2="8.5" y2="15.5" strokeWidth="2.5" />
      
      {/* Racket Head - Oval Frame (rotated 45deg) */}
      <ellipse 
        cx="13" 
        cy="11" 
        rx="5" 
        ry="6.5" 
        transform="rotate(-45 13 11)" 
        strokeWidth="2.2"
        fill="none"
      />
      
      {/* String Grid - Cross pattern for depth */}
      {/* Horizontal strings */}
      <line x1="10" y1="8.5" x2="16" y2="14.5" strokeWidth="1" opacity="0.5" />
      <line x1="10.5" y1="11" x2="15.5" y2="16" strokeWidth="1" opacity="0.5" />
      
      {/* Vertical strings */}
      <line x1="11.5" y1="7" x2="14.5" y2="10" strokeWidth="1" opacity="0.5" />
      <line x1="14" y1="9.5" x2="17" y2="12.5" strokeWidth="1" opacity="0.5" />
      
      {/* Shuttlecock - Feather cone */}
      <path 
        d="M 18.5 3.5 L 20.5 2.5 L 21.5 3 L 22 2.5 L 21 5.5 L 18.5 7 Z" 
        strokeWidth="1.8"
        fill="currentColor"
        opacity="0.85"
      />
      
      {/* Shuttlecock - Cork base (rounded) */}
      <circle cx="18.5" cy="7" r="1.3" strokeWidth="1.6" fill="currentColor" />
      
      {/* Motion lines for dynamic effect */}
      <line x1="20" y1="8" x2="21" y2="9" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="19" y1="9" x2="20" y2="10.5" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}