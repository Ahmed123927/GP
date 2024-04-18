import React from 'react'
import ClientFeatured from '../../Components/clientFeatured/ClientFeatured'
import ClientSection from '../../Components/clientSection/ClientSection'
import ClientPosts from '../../Components/clientPosts/ClientPosts'

export default function ClientHome() {
  const posts = [
    // {
    //   id: 1,
    //   author: 'Ahmed Hussein',
    //   authorRole: 'web company',
    //   authorAvatar: 'https://bit.ly/sage-adebayo',
    //   content: 'test post',
    //   imageUrl: '/img/man.png',
    //   imageAlt: 'Chakra UI',
    // },
    // {
    //   id: 1,
    //   author: 'Ahmed mahmoud',
    //   authorRole: 'Creator, Chakra UI',
    //   authorAvatar: 'https://bit.ly/sage-adebayo',
    //   content: 'With Chakra UI, I wanted to sync...',
    //   imageUrl: '/img/man.png',
    //   imageAlt: 'Chakra UI',
    // },

    // {
    //   id: 2,
    //   author: 'Segun Adebayo',
    //   authorRole: 'Creator, Chakra UI',
    //   authorAvatar: 'https://bit.ly/sage-adebayo',
    //   content: 'With Chakra UI, I wanted to sync...',
    //   imageUrl: '/img/man.png',
    //   imageAlt: 'Chakra UI',
    // },
    // {
    //   id: 2,
    //   author: 'Segun Adebayo',
    //   authorRole: 'Creator, Chakra UI',
    //   authorAvatar: 'https://bit.ly/sage-adebayo',
    //   content: 'With Chakra UI, I wanted to sync...',
    //   imageUrl: '/img/man.png',
    //   imageAlt: 'Chakra UI',
    // },
    // {
    //   id: 2,
    //   author: 'Segun Adebayo',
    //   authorRole: 'Creator, Chakra UI',
    //   authorAvatar: 'https://bit.ly/sage-adebayo',
    //   content: 'With Chakra UI, I wanted to sync...',
    //   imageUrl: '/img/man.png',
    //   imageAlt: 'Chakra UI',
    // },
    // {
    //   id: 2,
    //   author: 'Segun Adebayo',
    //   authorRole: 'Creator, Chakra UI',
    //   authorAvatar: 'https://bit.ly/sage-adebayo',
    //   content: 'With Chakra UI, I wanted to sync...',
    //   imageUrl: '/img/man.png',
    //   imageAlt: 'Chakra UI',
    // },
    // // 
  ];
  return (
    <div>
      <ClientFeatured/>
      <ClientSection/>
      <ClientPosts posts={posts}/>
    </div>
  )
}
