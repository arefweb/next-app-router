import axios from 'axios';
import Image from "next/image";
import members from '@/assets/images/members.svg';
import association from "@/assets/images/association.svg";
import groups from "@/assets/images/groups.svg";

async function fetchData() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function Home() {
  const data = await fetchData();

  return (
    <div>
      <div className="flex justify-center">
        <p className="text-2xl max-w-[370px] text-center">
          Manage your entire community in a single system
        </p>
      </div>

      <div className="px-16 flex justify-center mx-auto flex-wrap max-w-5xl my-4">
        <div className="w-1/3 flex justify-center align-middle p-[1rem] text-center">
          <div className="shadow-sm p-4">
            <div className="mx-auto p-1.5 rounded-md my-2 bg-[#E8F5E9] w-max">
              <Image src={members} alt={""} />
            </div>
            <p className="text-2xl font-semibold">Membership Organisations</p>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Our membership management software provides full automation of
              membership renewals and payments
            </p>
          </div>
        </div>
        <div className="w-1/3 flex justify-center align-middle p-[1rem] text-center">
          <div className="shadow-sm p-4">
            <div className="mx-auto p-1.5 rounded-md my-2 bg-[#E8F5E9] w-max">
              <Image src={association} alt={""} />
            </div>
            <p className="text-2xl font-semibold">National Associations</p>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Our membership management software provides full automation of
              membership renewals and payments
            </p>
          </div>
        </div>
        <div className="w-1/3 flex justify-center align-middle p-[1rem] text-center">
          <div className="shadow-sm p-4">
            <div className="mx-auto p-1.5 rounded-md my-2 bg-[#E8F5E9] w-max">
              <Image src={groups} alt={""} />
            </div>
            <p className="text-2xl font-semibold">Clubs And Groups</p>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Our membership management software provides full automation of
              membership renewals and payments
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
