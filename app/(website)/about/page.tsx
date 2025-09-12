import Image from 'next/image';
import contact from '@/assets/images/contact.jpg';
import location from '@/assets/images/location.png';
import team from '@/assets/images/teamwork.png';

import Users from "./components/users/Users";
import getAddress from './functions/get-address';
import AddressRetry from './components/address-retry/AddressRetry';

async function AboutPage() {
  const response = await getAddress();
  const address = response?.data?.data;

  return (
    <div className="px-4 max-w-[82rem] mx-auto">
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="md:basis-1/2 basis-full">
          <Image src={contact} alt="contact" className="h-[100px] md:h-full object-cover" />
        </div>
        <div className="md:basis-1/2 basis-full flex flex-col justify-around">
          <section>
            <Image src={location} alt="address" width={50} height={50} />
            <h2 className="text-2xl/12 text-gray-700">
              Address
            </h2>
            {response.ok ? (
              <p className="font-bold">{address}</p>
            ) : (<AddressRetry />)}
          </section>

          <section>
            <Image src={team} alt="team" width={50} height={50} />
            <h2 className="text-2xl/12 text-gray-700">
              Our Team
            </h2>
            <Users />
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
