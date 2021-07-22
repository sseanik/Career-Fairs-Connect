import { Flex } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../../components/navbar';
import { StallCard } from '../../components/StallCard';
import { UniversityInfoCard } from '../../components/UniversityInfoCard';

export function CareerFair() {
  return (
    <div>
      <Navbar />
      <UniversityInfoCard />
      <Flex direction='row' flexWrap='wrap' justify='center'>
        <StallCard
          name='Facebook'
          description="Facebook, Inc. operates as a social networking company worldwide. The company engages in the development of social media applications for people to connect through mobile devices, personal computers, and other surfaces. ... The firm's products include Facebook, Instagram, Messenger, WhatsApp, and Oculus."
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Facebook.svg/1280px-Facebook.svg.png'
          isLive={true}
        />
        <StallCard
          name='Amazon'
          description='Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS). It sells merchandise and content purchased for resale from third-party sellers through physical and online stores. The company also manufactures and sells electronic devices, including Kindle, Fire tablets, Fire TVs, Rings, and Echo and other devices; provides Kindle Direct Publishing, an online service that allows independent authors and publishers to make their books available in the Kindle Store; and develops and produces media content. In addition, it offers programs that enable sellers to sell their products on its websites, as well as its stores; and programs that allow authors, musicians, filmmakers, skill and app developers, and others to publish and sell content. Further, the company provides compute, storage, database, analytics, machine learning, and other services, as well as fulfillment, advertising, publishing, and digital content subscriptions. Additionally, it offers Amazon Prime, a membership program, which provides free shipping of various items; access to streaming of movies and TV episodes; and other services. The company serves consumers, sellers, developers, enterprises, and content creators. Amazon.com, Inc. was founded in 1994 and is headquartered in Seattle, Washington.'
          img='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
          isLive={false}
        />
        <StallCard
          name='Netflix'
          description="Netflix is one of the world's leading entertainment services with over 209 million paid memberships in over 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages. Members can watch as much as they want, anytime, anywhere, on any internet-connected screen."
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
          isLive={false}
        />
        <StallCard
          name='Google'
          description='Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.        '
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png'
          isLive={true}
        />
        <StallCard
          name='Facebook'
          description="Facebook, Inc. operates as a social networking company worldwide. The company engages in the development of social media applications for people to connect through mobile devices, personal computers, and other surfaces. ... The firm's products include Facebook, Instagram, Messenger, WhatsApp, and Oculus."
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/480px-Facebook_logo_%28square%29.png'
          isLive={true}
        />
        <StallCard
          name='Amazon'
          description='Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS). It sells merchandise and content purchased for resale from third-party sellers through physical and online stores. The company also manufactures and sells electronic devices, including Kindle, Fire tablets, Fire TVs, Rings, and Echo and other devices; provides Kindle Direct Publishing, an online service that allows independent authors and publishers to make their books available in the Kindle Store; and develops and produces media content. In addition, it offers programs that enable sellers to sell their products on its websites, as well as its stores; and programs that allow authors, musicians, filmmakers, skill and app developers, and others to publish and sell content. Further, the company provides compute, storage, database, analytics, machine learning, and other services, as well as fulfillment, advertising, publishing, and digital content subscriptions. Additionally, it offers Amazon Prime, a membership program, which provides free shipping of various items; access to streaming of movies and TV episodes; and other services. The company serves consumers, sellers, developers, enterprises, and content creators. Amazon.com, Inc. was founded in 1994 and is headquartered in Seattle, Washington.'
          img='https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png'
          isLive={false}
        />
        <StallCard
          name='Netflix'
          description="Netflix is one of the world's leading entertainment services with over 209 million paid memberships in over 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages. Members can watch as much as they want, anytime, anywhere, on any internet-connected screen."
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png'
          isLive={false}
        />
        <StallCard
          name='Google'
          description='Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.        '
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/160px-Google_%22G%22_Logo.svg.png'
          isLive={true}
        />
      </Flex>
    </div>
  );
}
