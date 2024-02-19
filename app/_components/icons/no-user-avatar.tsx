import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import React from 'react'

function NoUserAvatar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        stroke="#4E525B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M30 33.333a10 10 0 00-20 0M20 23.333A6.667 6.667 0 1020 10a6.667 6.667 0 000 13.333z"
      ></path>
      <path
        stroke="#4E525B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 36.666c9.205 0 16.667-7.462 16.667-16.666 0-9.205-7.462-16.667-16.667-16.667-9.205 0-16.667 7.462-16.667 16.667 0 9.204 7.462 16.666 16.667 16.666z"
      ></path>
    </svg>
  )
}

export default NoUserAvatar
